import React from 'react';
import dynamic from "next/dynamic";
import ExclusiveOffersFallback from "./loading";

const ExclusiveOffersList = dynamic(
  () => import('./ExclusiveOffersList'),
  {loading: ExclusiveOffersFallback, ssr: true}
)

export default async function ExclusiveOffers() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/exclusive-offers`, {
    next: {revalidate: 60}
  })
  const data = await res.json();
  if (!data)
    return null

  return (
    <div className={'space-y-5 mt-[30px]'}>
      <h3 className={'px-app-padding font-semibold'}>Exclusive Offer</h3>
      <ExclusiveOffersList data={data?.data}/>
    </div>
  )
}

