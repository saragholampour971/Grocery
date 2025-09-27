import React from 'react';
import ExclusiveOffersList from "./ExclusiveOffersList";

export default async function ExclusiveOffers() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/exclusive-offers`, {
    next: {revalidate: 60}
  })
  const data = await res.json();
  if (!data)
    return null

  return (
    <div className={'space-y-5'}>
      <h3 className={'px-app-padding font-semibold'}>Exclusive Offer</h3>
      <ExclusiveOffersList data={data?.data}/>
    </div>
  )
}

