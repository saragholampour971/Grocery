import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const BannerFallback = () => {
  return (
    <div className={'px-app-padding'}>
      <div
        className={
          'relative w-full max-h-[160px] h-[calc(100vw/3)] rounded-md shadow-md'
        }
      >
        <Skeleton className={'w-full h-full'} />
      </div>
    </div>
  )
}

export default BannerFallback
