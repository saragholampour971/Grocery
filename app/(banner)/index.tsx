import React from 'react'
import Image from 'next/image'
import { homeService } from '@/service/homeService'

export default async function Banner() {
  const { data } = await homeService.getBanners()
  return (
    <div className={'px-app-padding'}>
      <div
        className={
          'relative w-full max-h-[200px] h-[calc(100vw/3)] rounded-md shadow-md'
        }
      >
        {Array.isArray(data) ? (
          <Image
            src={data?.[0]?.imageUrl || ''}
            alt={'banner'}
            fill
            priority
            className={'rounded-md object-cover'}
          />
        ) : null}
      </div>
    </div>
  )
}
