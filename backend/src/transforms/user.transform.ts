import { Auction, Bid, User } from '@prisma/client'
import { AuctionTransformed, transformAuctionArray } from './auction.transform'
import { BidTransformed, transformBidArray } from './bid.transform'

export type UserWithRelations = User & {
  auctions?: Auction[]
  bids?: Bid[]
}
export type UserTransformed = Omit<
  User,
  'password' | 'jwtSecret' | 'auctions' | 'bids'
> & {
  auctions?: AuctionTransformed[]
  bids?: BidTransformed[]
}

export function transformUser(data: UserWithRelations): UserTransformed {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { auctions, bids, password, jwtSecret, ...transformedUser } = data

  return {
    ...transformedUser,
    auctions: auctions && transformAuctionArray(auctions),
    bids: bids && transformBidArray(bids),
  }
}

export function transformUserArray(data: UserWithRelations[]) {
  return data.map(transformUser)
}
