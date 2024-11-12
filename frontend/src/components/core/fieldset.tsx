import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const Fieldset = forwardRef<
  HTMLFieldSetElement,
  ComponentPropsWithoutRef<'fieldset'>
>(({ className, ...props }, ref) => (
  <fieldset className={cn('space-y-4', className)} {...props} ref={ref} />
))
Fieldset.displayName = 'Fieldset'
