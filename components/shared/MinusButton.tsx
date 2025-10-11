'use client'
import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { cn } from '../../lib/utils'

const MinusButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <Button
      variant={'outline'}
      ref={ref}
      className={cn('!w-[46px] !h-[46px] rounded-2xl', className)}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </Button>
  )
})
MinusButton.displayName = 'MinusButton'

export default MinusButton
