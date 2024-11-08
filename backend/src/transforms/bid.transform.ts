import { Auction, Bid, User } from '@prisma/client'
import { AuctionTransformed, transformAuction } from './auction.transform'
import { transformUser, UserTransformed } from './user.transform'

export type BidWithRelations = Bid & {
  auction?: Auction
  user?: User
}

export type BidTransformed = Omit<Bid, 'auction' | 'bid'> & {
  auction?: AuctionTransformed
  user?: UserTransformed
}

export function transformBid(data: BidWithRelations): BidTransformed {
  const { auction, user, ...transformedBid } = data

  return {
    ...transformedBid,
    auction: auction && transformAuction(auction),
    user: user && transformUser(user),
  }
}

export function transformBidArray(data: BidWithRelations[]) {
  return data.map(transformBid)
}
