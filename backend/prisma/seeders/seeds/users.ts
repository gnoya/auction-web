import { Prisma, PrismaClient } from '@prisma/client'

export default async function seed(prisma: PrismaClient) {
  console.info('-> Seeding users ...')

  const users: Prisma.UserCreateManyInput[] = [
    {
      id: 1,
      email: 'test1@gmail.com',
      name: 'User Test 1',
      password: '$2a$12$DR/ZePd5ixJ3tE72MrX.guvYlpdDwonpiKTQVMC5fCrxeKn5JUHfK', // develop
    },
    {
      id: 2,
      email: 'test2@gmail.com',
      name: 'User Test 2',
      password: '$2a$12$DR/ZePd5ixJ3tE72MrX.guvYlpdDwonpiKTQVMC5fCrxeKn5JUHfK', // develop
    },
    {
      id: 3,
      email: 'test3@gmail.com',
      name: 'User Test 3',
      password: '$2a$12$DR/ZePd5ixJ3tE72MrX.guvYlpdDwonpiKTQVMC5fCrxeKn5JUHfK', // develop
    },
  ]

  return prisma.user.createMany({
    data: users,
  })
}
