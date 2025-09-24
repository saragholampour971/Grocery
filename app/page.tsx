"use server"
import ExclusiveOffers from "./(exclusive-offers)/ExclusiveOffers";
import Banner from "./(banner)";
import {Suspense} from "react";
import ExclusiveOffersFallback from "./(exclusive-offers)/loading";
import CustomHeader from "../components/shared/CustomHeader";
import Image from "next/image";
import CustomBody from "../components/shared/CustomBody";

export default async function Home() {


  return (
    <main>
      <CustomHeader>
        <Image src={'/svg/logo.svg'} alt={"logo"} width={40} height={40}/>
        <h4 className={'font-semibold mx-3'}>Grocery</h4>
      </CustomHeader>
      <CustomBody className={'space-y-[30px]'}>
        <Banner/>
        <Suspense fallback={<ExclusiveOffersFallback/>}>
          <ExclusiveOffers/>
        </Suspense>
      </CustomBody>
    </main>
  )
}


