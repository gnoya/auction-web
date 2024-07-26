import { Auction, Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'

export default class AuctionRepository {
  prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  async create(data: Prisma.AuctionUncheckedCreateInput): Promise<Auction> {
    return this.prisma.auction.create({ data })
  }
}
