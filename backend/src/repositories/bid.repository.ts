import { PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'

export default class BidRepository {
  private prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }
}
