import { http } from '@/lib/http'
import { Auction } from '@/types/auction'
import { Bid } from '@/types/bid'
import { parseBids } from './bid'
import { PaginationParams, PaginationResponse } from '@/types/pagination'
import { parsePagination } from './pagination'

export async function getAuctions(
  { pagination }: { pagination?: PaginationParams },
  signal?: AbortSignal,
): Promise<{ data: Auction[]; pagination: PaginationResponse }> {
  const response = await http.get('/auctions', {
    params: pagination,
    signal,
  })

  return {
    data: parseAuctions(response.data),
    pagination: parsePagination(response.data.pagination),
  }
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

  return parseAuction(response.data)
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
  { pagination }: { pagination?: PaginationParams },
  signal?: AbortSignal,
): Promise<{ data: Bid[]; pagination: PaginationResponse }> {
  const response = await http.get(`/auctions/${id}/bids`, {
    params: pagination,
    signal,
  })

  return {
    data: parseBids(response.data),
    pagination: parsePagination(response.data.pagination),
  }
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
