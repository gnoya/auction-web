import { createAuction } from '@/api/auction'
import { useCallback, useState } from 'react'
import { useErrorHandler } from './core/use-error-handler'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { UseAuctionFormResponse } from './forms/use-auction-form'

export function useCreateAuction() {
  const [isLoading, setIsLoading] = useState(false)
  const handleError = useErrorHandler()
  const navigate = useNavigate()

  const handleCreateAuction = useCallback(
    async (data: UseAuctionFormResponse) => {
      setIsLoading(true)

      try {
        await createAuction({
          ...data,
          startingPrice: parseFloat(data.startingPrice),
        })
        toast.success('Auction created successfully')
        return navigate('/dashboard/auctions')
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [handleError, navigate],
  )

  return {
    isLoading,
    handleCreateAuction,
  }
}
