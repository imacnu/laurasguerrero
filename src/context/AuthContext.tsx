'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

interface AuthContextValue {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: false })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Only initialize Supabase client in browser, after mount
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return
    }

    // Dynamic import avoids SSR initialization issues with missing env vars
    let unsubscribe: (() => void) | undefined

    import('@/lib/supabase/client')
      .then(({ createClient }) => {
        const supabase = createClient()
        setLoading(true)

        supabase.auth
          .getUser()
          .then(({ data }) => {
            setUser(data.user)
          })
          .catch(() => {})
          .finally(() => setLoading(false))

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })

        unsubscribe = () => subscription.unsubscribe()
      })
      .catch(() => setLoading(false))

    return () => unsubscribe?.()
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
