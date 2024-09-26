import { http } from '@/lib/http'
import { parseUser } from './user'

export async function login(
  username: string,
  password: string,
  signal?: AbortSignal,
) {
  const response = await http.post(
    '/auth/login',
    {
      username,
      password,
    },
    { signal },
  )

  const { user, token } = response.data.data
  return { user: parseUser(user), token }
}

export async function register(
  username: string,
  name: string,
  password: string,
  signal?: AbortSignal,
) {
  return await http.post(
    '/auth/sign-up',
    {
      username,
      name,
      password,
    },
    { signal },
  )
}
