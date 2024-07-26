import { ConflictError, ResourceNotFoundError } from '@/errors/common'
import UserRepository from '@/repositories/user.repository'
import { transformUser } from '@/transforms/user.transform'

type UserServiceParams = {
  userRepository?: UserRepository
}

export default class UserService {
  private userRepository: UserRepository

  constructor({ userRepository }: UserServiceParams = {}) {
    this.userRepository = userRepository || new UserRepository()
  }

  createUser = async (data: {
    email: string
    password: string
    name: string
  }) => {
    // -------- Check if email is not registered
    const user = await this.userRepository.showByEmail(data.email)
    if (user) throw new ConflictError('Email is already registered')

    // -------- Create the user
    const newUser = await this.userRepository.create(data)

    return transformUser(newUser)
  }

  getUser = async (userId: number, transform: boolean = true) => {
    // -------- Get the user
    const user = await this.userRepository.show(userId)
    if (!user)
      throw new ResourceNotFoundError(`User with id ${userId} not found`)

    return transform ? transformUser(user) : user
  }
}
