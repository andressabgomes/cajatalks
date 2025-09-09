import { useState, useEffect, useCallback } from 'react'
import { AuthService, type AuthUser } from '@/services/auth'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        if (mounted) {
          setUser(currentUser)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar usuário')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initAuth()

    // Listen to auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      if (mounted) {
        setUser(user)
        setLoading(false)
        setError(null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Sign in
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign up
  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.signUp(email, password, fullName)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.signOut()
      setUser(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<AuthUser>) => {
    if (!user) throw new Error('Usuário não autenticado')

    try {
      setLoading(true)
      setError(null)
      const updatedUser = await AuthService.updateProfile(user.id, updates)
      setUser(updatedUser)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil')
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.resetPassword(email)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao resetar senha')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update password
  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.updatePassword(newPassword)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar senha')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent' || user?.role === 'admin',
    isClient: user?.role === 'client',
  }
}
