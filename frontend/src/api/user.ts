import { http } from '@/lib/http'
import { User } from '@/types/user'

export async function profile(signal?: AbortSignal): Promise<User> {
  const response = await http.get('/auth/profile', { signal })

  return parseUser(response.data.data)
}

export async function getUser(
  userId: number,
  signal?: AbortSignal,
): Promise<User> {
  const response = await http.get(`/users/${userId}`, { signal })

  return parseUser(response.data.data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseUser(data: any): User {
  const { id, email, name } = data

  return {
    id,
    email,
    name,
  }
}
