import { Fieldset } from '@/components/core/fieldset'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingOverlay } from '../ui/loading-overlay'
import { useId } from 'react'
import { SubmitButton } from '../core/submit-button'
import {
  usePlaceBidForm,
  UsePlaceBidFormProps,
} from '@/hooks/forms/use-place-bid-form'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PlaceBidFormProps extends UsePlaceBidFormProps {}

export function PlaceBidForm({
  auctionId,
  currentPrice,
  onBid,
}: PlaceBidFormProps) {
  const { form, onSubmit, isLoading } = usePlaceBidForm({
    auctionId,
    currentPrice,
    onBid,
  })
  const formId = useId()

  return (
    <Form {...form}>
      <form id={formId} onSubmit={onSubmit}>
        <Fieldset
          disabled={isLoading}
          className="relative flex flex-wrap gap-4 space-y-0"
        >
          <LoadingOverlay visible={isLoading} />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="min-w-52 flex-1">
                <FormControl>
                  <Input {...field} label="Amount" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            className="mt-0 flex-1 md:max-w-52"
            form={formId}
            disabled={isLoading}
          >
            Place a bid
          </SubmitButton>
        </Fieldset>
      </form>
    </Form>
  )
}
