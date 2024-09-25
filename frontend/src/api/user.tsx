import { http } from '@/lib/http'
import { User } from '@/types/user'

export async function profile(): Promise<User> {
  const response = await http.get('/auth/profile')
  const { user } = response.data.data
  return parseUser(user)
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
