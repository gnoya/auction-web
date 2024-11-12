import { Bid } from '@/types/bid'
import { parseUser } from './user'

export function parseBids(data: unknown[]): Bid[] {
  return data.map(parseBid)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBid(data: any): Bid {
  const { id, auctionId, userId, amount, createdAt, user } = data

  return {
    id,
    auctionId,
    userId,
    amount,
    createdAt,
    user: user && parseUser(user),
  }
}
