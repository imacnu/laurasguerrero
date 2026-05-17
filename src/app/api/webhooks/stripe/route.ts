import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await handleCheckoutCompleted(session)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = await createServiceClient()

  // Idempotency check
  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('stripe_session_id', session.id)
    .single()

  if (existing) return

  const items: { productId: string; quantity: number }[] = JSON.parse(
    session.metadata?.items ?? '[]'
  )

  if (!items.length) return

  // Fetch current prices for order_items
  const productIds = items.map((i) => i.productId)
  const { data: products } = await supabase
    .from('products')
    .select('id, name, price, images, stock')
    .in('id', productIds)

  if (!products) return

  const shipping = session.collected_information?.shipping_details
  const shippingAddress = shipping?.address
    ? {
        name: shipping.name ?? '',
        line1: shipping.address.line1 ?? '',
        line2: shipping.address.line2 ?? '',
        city: shipping.address.city ?? '',
        postal_code: shipping.address.postal_code ?? '',
        country: shipping.address.country ?? '',
      }
    : null

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      stripe_session_id: session.id,
      customer_email: session.customer_details?.email ?? null,
      status: 'processing',
      total: session.amount_total ? session.amount_total / 100 : 0,
      shipping_address: shippingAddress,
    })
    .select('id')
    .single()

  if (orderError || !order) {
    console.error('Error creating order:', orderError)
    return
  }

  // Create order items
  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!
    return {
      order_id: order.id,
      product_id: item.productId,
      product_name: product.name,
      product_image: product.images[0] ?? null,
      quantity: item.quantity,
      price: product.price,
    }
  })

  await supabase.from('order_items').insert(orderItems)

  // Decrement stock
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId)!
    await supabase
      .from('products')
      .update({ stock: Math.max(0, product.stock - item.quantity) })
      .eq('id', item.productId)
  }
}
