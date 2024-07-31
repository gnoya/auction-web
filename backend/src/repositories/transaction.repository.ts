import { PrismaClient } from '@prisma/client'
import ApplicationPrisma from '@/database/application.prisma'
import { PrismaTransaction } from '@/types/prisma-transaction.type'

export default class TransactionRepository {
  private prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || ApplicationPrisma.client
  }

  transaction = async <T>(fn: (tx: PrismaTransaction) => Promise<T>) => {
    return this.prisma.$transaction(fn)
  }
}
