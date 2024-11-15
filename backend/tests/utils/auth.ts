import request from 'supertest'
import app from '../../src/app'

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const res = await request(app).post('/api/auth/login').send({
    email,
    password,
  })

  return res.body.data as { user: any; token: string } // eslint-disable-line
}

export async function loginAsUser(id: number) {
  return login({
    email: `test${id}@gmail.com`,
    password: 'develop',
  })
}

export async function signUp({
  email,
  password,
  name,
}: {
  email?: string
  password?: string
  name?: string
}) {
  const res = await request(app).post('/api/auth/sign-up').send({
    email,
    password,
    name,
  })

  return res
}

export async function getMyProfile(token: string) {
  const res = await request(app)
    .get(`/api/auth/profile/`)
    .set('Authorization', `Bearer ${token}`)

  return res
}
