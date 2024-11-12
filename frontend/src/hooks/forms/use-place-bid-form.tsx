import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useErrorHandler } from '@/hooks/core/use-error-handler'
import { toast } from 'sonner'
import { bidOnAuction } from '@/api/auction'

const buildFormSchema = () =>
  z.object({
    amount: z.coerce.number().min(1, 'Amount is required.'),
  })

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

export interface UsePlaceBidFormProps {
  auctionId: number
  onBid?: () => void
}

export function usePlaceBidForm({ auctionId, onBid }: UsePlaceBidFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      amount: 0,
    },
    resolver: zodResolver(buildFormSchema()),
  })
  const handleError = useErrorHandler()

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      setIsLoading(true)

      try {
        await bidOnAuction(auctionId, values)
        toast.success('Bid placed successfully')
        form.reset()
        onBid?.()
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [auctionId, form, onBid, handleError],
  )

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  }
}
