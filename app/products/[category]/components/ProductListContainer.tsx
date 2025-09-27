import React from 'react';
import {ProductResponse} from "@/app/api/products/type";
import {ProductList} from "./ProductList";
import Image from "next/image";

type Props = {
  categoryId: string;
}

export default async function ProductListContainer(props: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${props.categoryId}`,
    {next: {revalidate: 60}})
  const data: ProductResponse = await res.json()

  if (!data?.data?.length)
    return (
      <div className={'text-center'}>
        <Image className={'mx-auto'} src={'/img/no-data.jpg'} alt={'no-data'} width={300} height={400}/>
        <h5 className={'font-semibold'}>Empty !</h5>
      </div>)

  return (
    <ProductList products={data.data}/>
  );
};

