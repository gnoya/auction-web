import { getMyProfile, loginAsUser, signUp } from '../utils/auth'

describe('Login testing', () => {
  it('User one should be able to login', async () => {
    const response = await loginAsUser(1)

    expect(response.token).toBeDefined()
    expect(response.user.email).toEqual('test1@gmail.com')
  })
})

describe('Sign up testing', () => {
  it('Sign up without email returns 400', async () => {
    const response = await signUp({
      password: 'develop',
      name: 'test',
    })

    expect(response.status).toBe(400)
  })

  it('Sign up without name returns 400', async () => {
    const response = await signUp({
      email: 'asdasdasd@gmail.com',
      password: 'develop',
    })

    expect(response.status).toBe(400)
  })

  it('Sign up correctly creates a user', async () => {
    const emailNumber = Math.random() * 1000000
    const response = await signUp({
      email: `test${emailNumber}@gmail.com`,
      password: 'develop',
      name: `Test user ${emailNumber}`,
    })

    expect(response.status).toBe(201)

    const loginResponse = await loginAsUser(emailNumber)
    expect(loginResponse.token).toBeDefined()
    expect(loginResponse.user.email).toEqual(`test${emailNumber}@gmail.com`)
  })

  it('Sign up already registered email returns conflict 409', async () => {
    const emailNumber = Math.random() * 1000000
    const response = await signUp({
      email: `test${emailNumber}@gmail.com`,
      password: 'develop',
      name: `Test user ${emailNumber}`,
    })

    expect(response.status).toBe(201)

    const responseTwo = await signUp({
      email: `test${emailNumber}@gmail.com`,
      password: 'develop',
      name: `Test user ${emailNumber}`,
    })

    expect(responseTwo.status).toBe(409)
  })
})

describe('Profile testing', () => {
  it('Get my profile returns my data', async () => {
    const loginResponse = await loginAsUser(1)

    const profileResponse = await getMyProfile(loginResponse.token)
    expect(profileResponse.status).toBe(200)
    expect(profileResponse.body.data.email).toEqual('test1@gmail.com')
  })

  it('Get my profile with a wrong JWT returns 401', async () => {
    const profileResponse = await getMyProfile('1as15d15asd15a15sd')
    expect(profileResponse.status).toBe(401)
  })
})
