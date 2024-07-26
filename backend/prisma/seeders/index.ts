import { PrismaClient } from '@prisma/client'

import users from './seeds/users'
import auctions from './seeds/auctions'

const prisma = new PrismaClient()

async function seed() {
  console.info('> Running seeds ')

  await users(prisma)
  await auctions(prisma)

  console.info('\n✔ All seeds succesfully executed\n')
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
