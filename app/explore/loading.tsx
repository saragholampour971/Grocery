import React from 'react'
import { Card, CardTitle } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import CustomBody from '../../components/shared/CustomBody'

const Loading = () => {
  return (
    <CustomBody>
      <div
        className={'flex flex-wrap gap-[15px] justify-between px-app-padding'}
      >
        {Array.from({ length: 3 })?.map((item, index) => (
          <Card
            key={`category-list-item-${index}`}
            className={
              'w-[175px] h-[189px] text-center flex flex-col justify-between'
            }
          >
            <div className={'relative aspect-[9/7]'}>
              <Skeleton
                className={'mx-auto w-[90px] h-[90px] rounded-2xl mt-4'}
              />
            </div>
            <CardTitle>
              <Skeleton className={'w-full h-4 my-3'} />
            </CardTitle>
          </Card>
        ))}
      </div>
    </CustomBody>
  )
}

export default Loading
