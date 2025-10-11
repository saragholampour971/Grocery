import React from 'react'
import { CategoryResponse } from '@/app/api/category/type'
import { Card, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { hexToRgba } from '@/lib/utils'
import CustomBody from '../../components/shared/CustomBody'

const colors = [
  '#53B175',
  '#F8A44C',
  '#F7A593',
  '#D3B0E0',
  '#FDE598',
  '#B7DFF5',
]

export default async function Explore() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`, {
    cache: 'force-cache',
  })
  const json: CategoryResponse = await res.json()
  const data = json?.data

  const borderColors = Array.isArray(data)
    ? data?.map((_, index) => colors[index % colors.length])?.reverse()
    : []

  return (
    <CustomBody
      className={
        'flex flex-wrap gap-[15px] justify-between px-app-padding mb-1 '
      }
    >
      {Array.isArray(data)
        ? data?.map((item, index) => (
            <Link
              key={`category-list-item-${item.id}`}
              href={`/products/${item.title}-${item.id}`}
              className={'w-[175px] h-[189px] '}
            >
              <Card
                style={{
                  borderColor: borderColors[index],
                  backgroundColor: hexToRgba(colors[index], 0.1),
                }}
                className={
                  'text-center flex flex-col justify-between w-full h-full'
                }
              >
                <div className={'relative aspect-[9/7]'}>
                  <Image
                    fill
                    src={item.imageUrl}
                    alt={item.title}
                    loading={'lazy'}
                    className={'object-contain p-1'}
                  />
                </div>
                <CardTitle className={'text-base font-bold'}>
                  {item?.title}
                </CardTitle>
              </Card>
            </Link>
          ))
        : null}
    </CustomBody>
  )
}
