import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@/lib/supabase/server'
import { checkoutSchema } from '@/lib/validations/order'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = checkoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { items } = parsed.data
    const supabase = await createClient()

    // Validate prices server-side — never trust the client
    const productIds = items.map((i) => i.productId)
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, price, images, stock, slug')
      .in('id', productIds)

    if (error || !products) {
      return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
    }

    // Check stock and build line items
    const lineItems = []
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 })
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product.name}` },
          { status: 400 }
        )
      }
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            images: product.images.slice(0, 1),
            metadata: { productId: product.id, slug: product.slug },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['ES', 'PT', 'FR', 'DE', 'IT', 'GB'],
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      metadata: {
        items: JSON.stringify(items),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
