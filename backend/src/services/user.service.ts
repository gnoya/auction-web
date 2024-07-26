import { ResourceNotFoundError } from '@/errors/common'
import UserRepository from '@/repositories/user.repository'
import { transformUser } from '@/transforms/user.transform'

type UserServiceParams = {
  userRepository?: UserRepository
}

export default class UserService {
  userRepository: UserRepository

  constructor({ userRepository }: UserServiceParams = {}) {
    this.userRepository = userRepository || new UserRepository()
  }

  async createUser(data: { email: string; password: string; name: string }) {
    // -------- Create the user
    const newUser = await this.userRepository.create(data)

    return transformUser(newUser)
  }

  async getUser(userId: number) {
    // -------- Get the user
    const user = await this.userRepository.show(userId)
    if (!user)
      throw new ResourceNotFoundError(`User with id ${userId} not found`)

    return transformUser(user)
  }
}
