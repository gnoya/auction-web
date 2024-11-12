import { Auction } from '@/types/auction'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const buildFormSchema = () =>
  z.object({
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(1, 'Description is required.'),
    startingPrice: z.string().min(1, 'Starting price must be greater than $1.'),
    endTime: z.string().min(1, 'End time is required.'),
  })

export type UseAuctionFormResponse = z.infer<ReturnType<typeof buildFormSchema>>

export interface UseAuctionFormProps {
  auction?: Auction
  onContinue: (values: UseAuctionFormResponse) => void
}

export function useAuctionForm({ auction, onContinue }: UseAuctionFormProps) {
  const form = useForm<UseAuctionFormResponse>({
    defaultValues: {
      title: '',
      description: '',
      startingPrice: '',
      endTime: '',
    },
    values: auction && {
      title: auction.title,
      description: auction.description,
      startingPrice: auction.startingPrice.toString(),
      endTime: auction.endTime,
    },
    resolver: zodResolver(buildFormSchema()),
  })

  return {
    form,
    onSubmit: form.handleSubmit(onContinue),
  }
}
