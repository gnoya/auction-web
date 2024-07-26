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
  private userService: UserService
  private authService: AuthService

  constructor({ userService, authService }: AuthControllerParams = {}) {
    this.userService = userService || new UserService()
    this.authService = authService || new AuthService()
  }

  login = async (
    req: Request
  ): Promise<{
    status: number
    data: {
      user: UserTransformed
      token: string
    }
  }> => {
    // -------- Validate the request
    const validated = await loginValidator(req)

    // -------- Login the user
    const loginData = await this.authService.login(validated)

    return { status: 200, data: loginData }
  }

  signUp = async (
    req: Request
  ): Promise<{
    status: number
    data: UserTransformed
  }> => {
    // -------- Validate the request
    const validated = await signUpValidator(req)

    // -------- Create the user
    const data = await this.userService.createUser(validated)

    return { status: 201, data }
  }

  profile = async (
    req: Request
  ): Promise<{
    status: number
    data: UserTransformed
  }> => {
    // -------- Get the requester userId
    const myUserId = reqToUserId(req)

    // -------- Get the user data
    const data = await this.userService.getUser(myUserId)

    return { status: 200, data }
  }
}
