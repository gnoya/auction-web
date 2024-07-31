import { Auction, Prisma, PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'
import { PrismaTransaction } from '@/types/prisma-transaction.type'

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
