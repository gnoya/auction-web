import { Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'

export default class BidRepository {
  private prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  allByAuctionId = async (auctionId: number) => {
    return this.prisma.bid.findMany({
      where: { auctionId },
      include: { user: true },
    })
  }

  create = async (data: Prisma.BidUncheckedCreateInput) => {
    return this.prisma.bid.create({ data })
  }
}
