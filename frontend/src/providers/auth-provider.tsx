import { ReactNode, useCallback, useState } from 'react'
import { User } from '@/types/user'
import { login } from '@/api/auth'
import { flushSession, getSavedUser, saveToken, saveUser } from '@/api/session'
import { authContext } from '@/contexts/auth-context'

interface AuthProviderProps {
  children: ReactNode
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(getSavedUser)
  const authenticated = user !== null

  const authenticate = useCallback(
    async (params: { email: string; password: string }) => {
      const { user, token } = await login(params)
      saveToken(token)
      saveUser(user)
      setUser(user)

      return user
    },
    [],
  )

  const invalidate = useCallback(async () => {
    flushSession()
    setUser(null)
  }, [])

  const updateUser = useCallback((user: User) => {
    saveUser(user)
    setUser(user)
  }, [])

  return (
    <authContext.Provider
      value={{
        user,
        updateUser,
        authenticated,
        authenticate,
        invalidate,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
