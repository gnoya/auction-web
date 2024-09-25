import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Spinner({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'h-10 w-10 animate-spin rounded-full border-4 border-y-transparent border-l-primary border-r-transparent',
        className,
      )}
      {...props}
    />
  )
}
