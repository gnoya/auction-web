import Error from './common'

export class WrongCredentialsError extends Error {
  constructor(detail?: string) {
    super({
      status: 400,
      title: 'Wrong Credentials',
      detail: detail || 'The provided credentials are invalid',
    })
  }
}
