import { User, Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'
import bcrypt from 'bcrypt'

const HASH_SALT_ROUNDS = 12

export default class UserRepository {
  private prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  create = async (data: Prisma.UserCreateInput): Promise<User> => {
    data.password = await bcrypt.hash(data.password, HASH_SALT_ROUNDS)

    return this.prisma.user.create({ data })
  }

  update = async (id: number, data: Prisma.UserUpdateInput): Promise<User> => {
    if (data.password)
      data.password = await bcrypt.hash(
        data.password as string,
        HASH_SALT_ROUNDS
      )

    return this.prisma.user.update({ where: { id }, data })
  }

  show = async (id: number): Promise<User | null> => {
    return this.prisma.user.findUnique({ where: { id } })
  }

  showByEmail = async (email: string): Promise<User | null> => {
    return this.prisma.user.findUnique({ where: { email } })
  }
}
