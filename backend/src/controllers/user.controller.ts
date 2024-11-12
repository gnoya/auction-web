import { Request } from 'express'
import UserService from '@/services/user.service'
import { UserTransformed } from '@/transforms/user.transform'
import { userShowValidator } from '@/validators/user/show.validator'

type UserControllerParams = {
  userService?: UserService
}

export default class UserController {
  private userService: UserService

  constructor({ userService }: UserControllerParams = {}) {
    this.userService = userService || new UserService()
  }

  show = async (
    req: Request
  ): Promise<{
    status: number
    data: UserTransformed
  }> => {
    // -------- Get the user id from the request
    const { id } = await userShowValidator(req)

    // -------- Get the user data
    const data = await this.userService.getUser(id)

    return { status: 200, data }
  }
}
