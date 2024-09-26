import { getAuction } from '@/api/auction'
import useSWR from 'swr'

const fetcher = ([, auctionId]: [string, number], signal?: AbortSignal) =>
  getAuction(auctionId, signal)

export function useAuction(auctionId: number) {
  return useSWR(['auction', auctionId], fetcher)
}
