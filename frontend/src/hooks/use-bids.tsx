import { getAuctionBids } from '@/api/auction'
import { PaginationParams } from '@/types/pagination'
import { useState } from 'react'
import useSWR from 'swr'
import { usePaginationFns } from './core/use-pagination-fns'

const fetcher = (
  params: {
    key: string
    auctionId: number
    pagination: PaginationParams
  },
  signal?: AbortSignal,
) => getAuctionBids(params.auctionId, params, signal)

export function useBids(auctionId: number | undefined) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data, ...rest } = useSWR(
    auctionId
      ? {
          key: 'get-auction-bids',
          auctionId,
          pagination: {
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      : null,
    fetcher,
  )
  const totalPages = data?.pagination.lastPage || 1
  const paginationFns = usePaginationFns({
    totalPages,
    setCurrentPage,
  })

  return {
    data: data?.data,
    pagination: {
      currentPage,
      totalPages,
      ...paginationFns,
      itemsPerPage,
      setItemsPerPage,
    },
    ...rest,
  }
}
