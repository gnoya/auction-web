import { Dispatch, SetStateAction, useCallback } from 'react'

interface UsePaginationFnsProps {
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}
export function usePaginationFns(props: UsePaginationFnsProps) {
  const { setCurrentPage, totalPages } = props
  const goToFirstPage = useCallback(() => {
    setCurrentPage(1)
  }, [setCurrentPage])

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [setCurrentPage])

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [setCurrentPage, totalPages])

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages)
  }, [setCurrentPage, totalPages])

  return { goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage }
}
