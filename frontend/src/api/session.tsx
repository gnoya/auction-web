import { User } from '@/types/user'

export function getSavedUser(): User | null {
  const user = window.localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function saveUser(user: User) {
  window.localStorage.setItem('user', JSON.stringify(user))
}

export function getSavedToken(): string | null {
  return window.localStorage.getItem('token')
}

export function saveToken(token: string) {
  window.localStorage.setItem('token', token)
}

export function flushSession() {
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('token')
}
