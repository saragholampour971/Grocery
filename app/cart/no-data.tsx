import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import Image from 'next/image'

const NoData = () => {
  return (
    <div>
      <div className={'relative w-3/4 h-[calc(100vw/1.4)] m-auto'}>
        <Image
          loading={'lazy'}
          src={'/img/empty-bill.png'}
          alt={'empty bill'}
          fill
          className={'p-9'}
        />
      </div>
      <Link href={'/'} className={'flex mx-auto w-fit'}>
        <Button size={'lg'} type={'button'}>
          Add Product
        </Button>
      </Link>
    </div>
  )
}

export default NoData
