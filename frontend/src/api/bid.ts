import { Bid } from '@/types/bid'

export function parseBids(data: unknown[]): Bid[] {
  return data.map(parseBid)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBid(data: any): Bid {
  const { id, auctionId, userId, amount, createdAt } = data

  return {
    id,
    auctionId,
    userId,
    amount,
    createdAt,
  }
}
