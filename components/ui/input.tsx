import * as React from 'react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type InputProps = {
  label?: string | ReactNode
}
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & InputProps
>(({ className, type, label: inputLabel, name, ...props }, ref) => {
  return (
    <div className={'space-y-1.5'}>
      {typeof inputLabel === 'string' ? (
        <label
          htmlFor={name || ''}
          className={'text-h6 font-semibold text-gray-500'}
        >
          {inputLabel}
        </label>
      ) : (
        inputLabel
      )}
      <input
        id={name}
        name={name}
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
