import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  containerClassName?: string
  forcedPlaceholder?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      forcedPlaceholder,
      name,
      placeholder,
      label,
      type,
      ...props
    },
    ref,
  ) => {
    return label ? (
      <div className={cn('relative', containerClassName)}>
        <input
          name={name}
          type={type}
          placeholder={forcedPlaceholder || ''}
          className={cn(
            'peer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))] focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70',
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm font-medium leading-none text-muted-foreground duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-90 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {label}
        </label>
      </div>
    ) : (
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))] focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
