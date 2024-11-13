import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Fieldset } from '@/components/core/fieldset'
import { Input } from '@/components/ui/input'
import {
  UseAuctionFormProps,
  useAuctionForm,
} from '@/hooks/forms/use-auction-form'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { SubmitButton } from '../core/submit-button'
import { useId } from 'react'
import { DatePicker } from '../ui/date-picker'

interface AuctionFormProps extends UseAuctionFormProps {
  buttonLabel?: string
  isLoading?: boolean
}

export function AuctionForm({
  buttonLabel = 'Create',
  auction,
  isLoading = false,
  onContinue,
}: AuctionFormProps) {
  const formId = useId()
  const { form, onSubmit } = useAuctionForm({
    auction,
    onContinue,
  })

  return (
    <Form {...form}>
      <form id={formId} onSubmit={onSubmit}>
        <Fieldset disabled={isLoading} className="relative">
          <LoadingOverlay visible={isLoading} />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Title" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-wrap justify-start gap-4">
            <FormField
              control={form.control}
              name="startingPrice"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      label="Starting price"
                      disabled={auction !== undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DatePicker
              label="End time"
              onSelect={(date) => form.setValue('endTime', date.toISOString())}
              defaultDate={auction ? new Date(auction.endTime) : new Date()}
              className="flex-1"
            />
            {/* <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      label="End time"
                      disabled={auction !== undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <SubmitButton className="w-full" form={formId}>
            {buttonLabel}
          </SubmitButton>
        </Fieldset>
      </form>
    </Form>
  )
}
