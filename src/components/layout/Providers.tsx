'use client'

import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FAF9F6',
              borderRadius: '0',
              fontSize: '13px',
              letterSpacing: '0.05em',
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  )
}
