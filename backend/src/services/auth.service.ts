import { WrongCredentialsError } from '@/errors/wrong-credentials'
import UserRepository from '@/repositories/user.repository'
import { transformUser } from '@/transforms/user.transform'
import { JWTPayload } from '@/types/jwt-payload.type'
import { signJWT } from '@/utils/jwt'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

type AuthServiceParams = {
  userRepository?: UserRepository
}

export default class AuthService {
  userRepository: UserRepository

  constructor({ userRepository }: AuthServiceParams = {}) {
    this.userRepository = userRepository || new UserRepository()
  }

  async login(data: { email: string; password: string }) {
    // -------- Get the user
    const user = await this.userRepository.showByEmail(data.email)
    if (!user) throw new WrongCredentialsError()

    // -------- Compare the password
    const auth = await bcrypt.compare(data.password, user.password)
    if (!auth) throw new WrongCredentialsError()

    // -------- Create the JWT
    const JWTpayload: JWTPayload = {
      userId: user.id,
      iat: Date.now(),
    }

    const secret = crypto.randomBytes(255).toString('base64')
    const token = signJWT(JWTpayload, secret, '365d')

    return {
      user: transformUser(user),
      token,
    }
  }
}
