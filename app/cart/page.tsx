"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {cartService} from "../../services/cartService";
import {IPostParams} from "../api/cart/type";
import ProductCard from "../../components/shared/ProductCard";
import Image from "next/image";
import Link from "next/link";
import {Button} from "../../components/ui/button";
import CustomHeader from "../../components/shared/CustomHeader";
import CustomBody from "../../components/shared/CustomBody";

export default function Cart() {
  const queryClient = useQueryClient();
  // fetch cart
  const {data: cartValue,} = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });

  // add product
  const addMutation = useMutation<void, Error, IPostParams>({
    mutationFn: ({productId, quantity}) => cartService.addToCart(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["cart"]}),

  });
  console.log('cart', cartValue)
  return (
    <div>
      <CustomHeader>
        <h4 className={'font-bold'}>My Cart</h4>
      </CustomHeader>
      <CustomBody>
        {cartValue?.data?.length === 0 ? (
          <div className={'relative w-3/4 h-[calc(100vw/1.4)] m-auto'}>
            <Image src={"/img/empty-bill.png"} alt={"empty bill"} fill className={'p-9'}/>
          </div>
        ) : (
          <ul>
            {cartValue?.data?.map((item) =>
              <ProductCard key={item.id} product={item} quantity={item.quantity}/>
            )}
          </ul>
        )}
        <Link href={'/'} className={'flex mx-auto w-fit '}>
          <Button size={'lg'}
                  onClick={() => addMutation.mutate({productId: "prod001", quantity: 1})}>
            Add Product
          </Button>
        </Link>
      </CustomBody>
    </div>
  )
}
