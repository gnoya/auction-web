import { UnauthorizedError } from '@/errors/common'
import { Auction } from '@prisma/client'

export async function auctionBelongsToUserValidator(
  auction: Auction,
  userId: number
) {
  if (auction.userId !== userId)
    throw new UnauthorizedError(
      `Your are not authorized to delete auction with id ${auction.id}`
    )
}
