import { Auction } from '@prisma/client'

export async function auctionBelongsToUserValidator(
  auction: Auction,
  userId: number
) {
  return auction.userId === userId
}
