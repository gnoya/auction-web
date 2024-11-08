import { Auction, Bid, User } from '@prisma/client'
import { BidTransformed, transformBidArray } from './bid.transform'
import { transformUser, UserTransformed } from './user.transform'

export type AuctionWithRelations = Auction & {
  user?: User
  bids?: Bid[]
}
export type AuctionTransformed = Omit<Auction, 'user' | 'bids'> & {
  user?: UserTransformed
  bids?: BidTransformed[]
}

export function transformAuction(
  data: AuctionWithRelations
): AuctionTransformed {
  const { user, bids, ...transformedAuction } = data

  return {
    ...transformedAuction,
    user: user && transformUser(user),
    bids: bids && transformBidArray(bids),
  }
}

export function transformAuctionArray(data: AuctionWithRelations[]) {
  return data.map(transformAuction)
}
