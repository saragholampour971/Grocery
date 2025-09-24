"use server"
import Header from "./components/Header";
import ProductListContainer from "./components/ProductListContainer";
import {Suspense} from "react";
import ProductsOfCategoryFallback from "./loading";
import CustomBody from "@/components/shared/CustomBody";

type Props = {
  params: { category: string }
}

export default async function ProductsOfCategory(props: Props) {
  const [categoryName, categoryId] = props.params.category.split('-');


  return (
    <>
      <Header title={decodeURIComponent(categoryName)}/>
      <CustomBody>
        <Suspense fallback={<ProductsOfCategoryFallback/>}>
          <ProductListContainer categoryId={categoryId}/>
        </Suspense>
      </CustomBody>
    </>
  )

}
