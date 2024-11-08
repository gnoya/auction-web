import { Bid, Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'
import { PrismaTransaction } from '@/types/prisma-transaction.type'
import { PaginationParams, PaginationResponse } from '@/types/pagination.type'

export default class BidRepository {
  private prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  allPaginatedByAuctionId = async (
    auctionId: number,
    pagination: PaginationParams
  ): Promise<{
    data: Bid[]
    pagination: PaginationResponse
  }> => {
    const { page, limit } = pagination
    const total = await this.prisma.bid.count()
    const lastPage = Math.ceil(total / limit) || 1

    const data = await this.prisma.bid.findMany({
      where: { auctionId },
      include: { user: true },
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      data,
      pagination: {
        page,
        lastPage,
      },
    }
  }

  create = async (
    data: Prisma.BidUncheckedCreateInput,
    tx?: PrismaTransaction
  ) => {
    return (tx || this.prisma).bid.create({ data })
  }
}
