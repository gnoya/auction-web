import { http } from '@/lib/http'
import { User } from '@/types/user'

export async function login(username: string, password: string) {
  const response = await http.post('/auth/login', {
    username,
    password,
  })
  const { user, token } = response.data.data
  return { user: parseUser(user), token }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseUser(data: any): User {
  const { id, email, name } = data
  return {
    id,
    email,
    name,
  }
}
