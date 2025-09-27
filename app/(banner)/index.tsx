import React from 'react';
import Image from "next/image";
import {BannerResponse} from "@/app/api/banner/type";

export default async function Banner() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/banner`, {
    next: {revalidate: 60},
  })
  const json = await data.json() as BannerResponse;

  return (
    <div className={'px-app-padding'}>
      <div className={'relative w-full max-h-[200px] h-[calc(100vw/3)] rounded-md shadow-md'}>
        {Array.isArray(json?.data) ?
          <Image
            src={json?.data[0]?.imageUrl || ''}
            alt={'banner'}
            fill
            priority
            className={'rounded-md object-cover'}

          />
          : null
        }
      </div>
    </div>
  );
}

