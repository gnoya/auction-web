import { Auction, Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'

export default class AuctionRepository {
  private prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  create = async (
    data: Prisma.AuctionUncheckedCreateInput
  ): Promise<Auction> => {
    return this.prisma.auction.create({ data })
  }
}
