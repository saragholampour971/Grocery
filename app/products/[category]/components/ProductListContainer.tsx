import React from 'react';
import {ProductList} from "./ProductList";
import Image from "next/image";
import {productsService} from "@/store/productsService";

type Props = {
  categoryId: string;
}

export default async function ProductListContainer(props: Props) {
  const data = await productsService.getProductsByCategoryId(props.categoryId);

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

