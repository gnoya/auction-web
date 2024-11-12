import { updateAuction } from '@/api/auction'
import { useCallback, useState } from 'react'
import { useErrorHandler } from './core/use-error-handler'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { UseAuctionFormResponse } from './forms/use-auction-form'

export function useEditAuction(auctionId: number) {
  const [isLoading, setIsLoading] = useState(false)
  const handleError = useErrorHandler()
  const navigate = useNavigate()

  const handleEditAuction = useCallback(
    async (data: UseAuctionFormResponse) => {
      setIsLoading(true)
      const { title, description } = data

      try {
        await updateAuction(auctionId, { title, description })
        toast.success('Auction updated successfully')
        return navigate('/dashboard/auctions')
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [auctionId, handleError, navigate],
  )

  return {
    isLoading,
    handleEditAuction,
  }
}
