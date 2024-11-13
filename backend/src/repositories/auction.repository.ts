import { Auction, Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'
import { PrismaTransaction } from '@/types/prisma-transaction.type'
import { PaginationResponse } from '@/types/pagination.type'

export default class AuctionRepository {
  public prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  create = async (
    data: Prisma.AuctionUncheckedCreateInput
  ): Promise<Auction> => {
    return this.prisma.auction.create({ data })
  }

  show = async (id: number): Promise<Auction | null> => {
    return this.prisma.auction.findUnique({ where: { id } })
  }

  all = async (): Promise<Auction[]> => {
    return this.prisma.auction.findMany()
  }

  allPaginated = async (
    pagination: {
      page: number
      limit: number
    },
    customWhere: Prisma.AuctionWhereInput = {}
  ): Promise<{
    data: Auction[]
    pagination: PaginationResponse
  }> => {
    const { page, limit } = pagination
    const where = {
      endTime: {
        gt: new Date(),
      },
      ...customWhere,
    }

    const total = await this.prisma.auction.count({
      where,
    })
    const lastPage = Math.ceil(total / limit) || 1

    const data = await this.prisma.auction.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
      orderBy: {
        endTime: 'asc',
      },
    })

    return {
      data,
      pagination: {
        page,
        lastPage,
      },
    }
  }

  update = async (
    id: number,
    data: Prisma.AuctionUncheckedUpdateInput,
    tx?: PrismaTransaction
  ): Promise<Auction> => {
    return (tx || this.prisma).auction.update({ where: { id }, data })
  }

  delete = async (id: number): Promise<Auction> => {
    return this.prisma.auction.delete({ where: { id } })
  }
}
