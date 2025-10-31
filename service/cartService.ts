import {
  AddCartParamsType,
  CartSchema,
  VoidSchema,
} from '@grocery-repo/schemas'
import { fetchApi } from '@/lib/fetchApi'

export const cartService = {
  // GET cart
  async getCart() {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`,
      CartSchema,
      {
        cache: 'no-store',
      }
    )
  },

  // ADD product to cart
  async addToCart({ productId, quantity }: AddCartParamsType) {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`,
      VoidSchema,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      }
    )
  },

  // REMOVE product from cart
  // async removeFromCart(productId: string) {
  //   const res = await fetch("/api/cart/remove", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ productId }),
  //   });
  //   if (!res.ok) throw new Error("Failed to remove product from cart");
  //   return res.json();
  // },

  // CLEAR cart
  // async clearCart() {
  //   const res = await fetch('/api/cart/clear', { method: 'POST' })
  //   if (!res.ok) throw new Error('Failed to clear cart')
  //   return res.json()
  // },
}
