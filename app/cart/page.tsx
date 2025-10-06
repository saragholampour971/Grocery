"use client"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {cartService} from "@/store/cartService";
import {IPostParams} from "@/app/api/cart/type";
import ProductCard from "@/components/shared/ProductCard";
import CustomHeader from "@/components/shared/CustomHeader";
import CustomBody from "@/components/shared/CustomBody";
import NoData from "./no-data";

export default function Cart() {
  const queryClient = useQueryClient();

  const {data: cartValue, isLoading} = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });
  console.log('cart value', cartValue)
  // add product
  const addMutation = useMutation<void, Error, IPostParams>({
    mutationFn: ({productId, quantity}) => cartService.addToCart(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["cart"]}),

  });

  return (
    <div>
      <CustomHeader>
        <h4 className={'font-bold'}>My Cart</h4>
      </CustomHeader>
      <CustomBody className={'px-app-padding'}>
        {!isLoading && !cartValue?.data ? (
          <NoData/>
        ) : (
          <div className={'flex items-start gap-4 space-4 flex-wrap'}>
            {cartValue?.data?.map((item) =>
              <ProductCard key={item.id} product={item} quantity={item.quantity}/>
            )}
          </div>
        )}

      </CustomBody>
    </div>
  )
}
