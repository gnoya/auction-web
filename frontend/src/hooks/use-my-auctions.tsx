import { getMyAuctions } from '@/api/auction'
import { PaginationParams } from '@/types/pagination'
import { useState } from 'react'
import useSWR from 'swr'
import { usePaginationFns } from './core/use-pagination-fns'

const fetcher = (
  params: {
    key: string
    pagination: PaginationParams
  },
  signal?: AbortSignal,
) => getMyAuctions(params, signal)

export function useMyAuctions() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data, ...rest } = useSWR(
    {
      key: 'get-my-auctions',
      pagination: {
        page: currentPage,
        limit: itemsPerPage,
      },
    },
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
