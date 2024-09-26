import { http } from '@/lib/http'
import { Auction } from '@/types/auction'
import { Bid } from '@/types/bid'
import { parseBids } from './bid'

export async function getAuctions(params?: {
  signal?: AbortSignal
}): Promise<Auction[]> {
  const response = await http.get('/auctions', { signal: params?.signal })

  return parseAuctions(response.data.data)
}

export async function createAuction(data: unknown, signal?: AbortSignal) {
  return await http.post('/auctions', data, { signal })
}

export async function updateAuction(
  id: number,
  data: unknown,
  signal?: AbortSignal,
) {
  return await http.put(`/auctions/${id}`, data, { signal })
}

export async function deleteAuction(id: number, signal?: AbortSignal) {
  return await http.delete(`/auctions/${id}`, { signal })
}

export async function getAuction(
  id: number,
  signal?: AbortSignal,
): Promise<Auction> {
  const response = await http.get(`/auctions/${id}`, { signal })

  return parseAuction(response.data.data)
}

export async function bidOnAuction(
  id: number,
  data: unknown,
  signal?: AbortSignal,
) {
  return await http.post(`/auctions/${id}/bid`, data, { signal })
}

export async function getAuctionBids(
  id: number,
  signal?: AbortSignal,
): Promise<Bid[]> {
  const response = await http.get(`/auctions/${id}/bids`, { signal })

  return parseBids(response.data.data)
}

export function parseAuctions(data: unknown[]): Auction[] {
  return data.map(parseAuction)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAuction(data: any): Auction {
  const {
    id,
    userId,
    title,
    description,
    startingPrice,
    currentPrice,
    endTime,
    user,
    bids,
    createdAt,
    updatedAt,
  } = data

  return {
    id,
    userId,
    title,
    description,
    startingPrice,
    currentPrice,
    endTime,
    user,
    bids,
    createdAt,
    updatedAt,
  }
}
