import { http } from '@/lib/http'
import { Auction } from '@/types/auction'
import { Bid } from '@/types/bid'
import { parseBids } from './bid'

export async function getAuctions(): Promise<Auction[]> {
  const response = await http.get('/auctions')

  return parseAuctions(response.data.data)
}

export async function createAuction(data: unknown) {
  return await http.post('/auctions', data)
}

export async function updateAuction(id: number, data: unknown) {
  return await http.put(`/auctions/${id}`, data)
}

export async function deleteAuction(id: number) {
  return await http.delete(`/auctions/${id}`)
}

export async function getAuction(id: number): Promise<Auction> {
  const response = await http.get(`/auctions/${id}`)

  return parseAuction(response.data.data)
}

export async function bidOnAuction(id: number, data: unknown) {
  return await http.post(`/auctions/${id}/bid`, data)
}

export async function getAuctionBids(id: number): Promise<Bid[]> {
  const response = await http.get(`/auctions/${id}/bids`)

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
