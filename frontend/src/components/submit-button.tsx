import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const SubmitButton = forwardRef<
  HTMLButtonElement,
  Omit<ComponentPropsWithoutRef<typeof Button>, 'type'>
>(({ className, ...props }, ref) => (
  <Button
    type="submit"
    className={cn('w-7/12', className)}
    ref={ref}
    {...props}
  />
))
SubmitButton.displayName = 'SubmitButton'
