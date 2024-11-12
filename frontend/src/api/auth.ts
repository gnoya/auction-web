import { http } from '@/lib/http'
import { parseUser } from './user'

export async function login(
  { email, password }: { email: string; password: string },
  signal?: AbortSignal,
) {
  const response = await http.post(
    '/auth/login',
    {
      email,
      password,
    },
    { signal },
  )

  const { user, token } = response.data.data
  return { user: parseUser(user), token }
}

export async function register(
  { email, name, password }: { email: string; name: string; password: string },
  signal?: AbortSignal,
) {
  await http.post(
    '/auth/sign-up',
    {
      email,
      name,
      password,
    },
    { signal },
  )
}
