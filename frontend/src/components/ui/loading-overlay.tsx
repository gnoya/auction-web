import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/spinner'

interface LoadingOverlayProps extends ComponentPropsWithoutRef<'div'> {
  visible?: boolean
}
export function LoadingOverlay({
  visible,
  className,
  ...props
}: LoadingOverlayProps) {
  if (!visible) return null

  return (
    <div
      className={cn(
        'absolute inset-0 z-10 grid place-items-center rounded-md backdrop-blur-[2px]',
        className,
      )}
      {...props}
    >
      <Spinner />
    </div>
  )
}
