import { getAuctions } from '@/api/auction'
import useSWR from 'swr'

const fetcher = (
  params: {
    key: string
  },
  signal?: AbortSignal,
) => getAuctions({ ...params, signal })

export function useAuctions() {
  const { data: auctions, ...rest } = useSWR(
    {
      key: 'auctions',
    },
    fetcher,
  )

  return {
    auctions,
    ...rest,
  }
}
