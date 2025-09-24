"use server"
import React from 'react';
import {ProductResponse} from "@/app/api/products/type";
import {ProductList} from "./ProductList";

type Props = {
  categoryId: string;
}
export default async function ProductListContainer(props: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${props.categoryId}`,
    {next: {revalidate: 60}})
  const data: ProductResponse = await res.json()

  if (!data?.data)
    return null

  return (
    <ProductList products={data.data}/>
  );
};

