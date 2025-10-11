import ExclusiveOffers from './(exclusive-offers)/ExclusiveOffers'
import Banner from './(banner)'
import { Suspense } from 'react'
import ExclusiveOffersFallback from './(exclusive-offers)/loading'
import CustomHeader from '../components/shared/CustomHeader'
import Image from 'next/image'
import CustomBody from '../components/shared/CustomBody'
import BannerFallback from './(banner)/loading'

export default function Home() {
  return (
    <main>
      <CustomHeader>
        <Image
          src={'/svg/logo.svg'}
          alt={'logo'}
          width={40}
          height={40}
          priority
        />
        <h4>Grocery</h4>
      </CustomHeader>
      <CustomBody>
        <Suspense fallback={<BannerFallback />}>
          <Banner />
        </Suspense>
        <Suspense fallback={<ExclusiveOffersFallback />}>
          <ExclusiveOffers />
        </Suspense>
      </CustomBody>
    </main>
  )
}
