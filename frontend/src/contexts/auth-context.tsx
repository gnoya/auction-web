import type { User } from '@/types/user'
import { createContext } from 'react'

export const authContext = createContext<{
  user: User | null
  updateUser: (user: User) => void
  authenticated: boolean
  authenticate: (username: string, password: string) => Promise<User>
  invalidate: () => Promise<void>
}>({
  user: null,
  updateUser() {},
  authenticated: false,
  async authenticate() {
    throw new Error('Not implemented')
  },
  async invalidate() {
    throw new Error('Not implemented')
  },
})
