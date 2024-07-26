import { Request } from 'express'
import { loginValidator } from '@/validators/auth/login.validator'
import UserService from '@/services/user.service'
import { UserTransformed } from '@/transforms/user.transform'
import { signUpValidator } from '@/validators/auth/sign-up.validator'
import { reqToUserId } from '@/utils/jwt'
import AuthService from '@/services/auth.service'

type AuthControllerParams = {
  userService?: UserService
  authService?: AuthService
}

export default class AuthController {
  userService: UserService
  authService: AuthService

  constructor({ userService, authService }: AuthControllerParams = {}) {
    this.userService = userService || new UserService()
    this.authService = authService || new AuthService()
  }

  async login(req: Request): Promise<{
    status: number
    data: {
      user: UserTransformed
      token: string
    }
  }> {
    const validated = await loginValidator(req)
    const loginData = await this.authService.login(validated)

    return { status: 200, data: loginData }
  }

  async signUp(req: Request): Promise<{
    status: number
    data: UserTransformed
  }> {
    const validated = await signUpValidator(req)
    const data = await this.userService.createUser(validated)

    return { status: 201, data }
  }

  async profile(req: Request): Promise<{
    status: number
    data: UserTransformed
  }> {
    const myUserId = reqToUserId(req)
    const data = await this.userService.getUser(myUserId)

    return { status: 200, data }
  }
}
