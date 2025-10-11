import React, { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

const CustomHeader = (
  props: PropsWithChildren &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cn(
        'flex items-center justify-center h-mobile-navbar-height shadow-md !sticky top-0 bg-white [z-index:400]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default CustomHeader
