import {CartResponse} from "../app/api/cart/type";
import {fetchWithAuth} from "../lib/fetchWithAuth";

export const cartService = {
  // GET cart
  async getCart(): Promise<CartResponse> {
    return await fetchWithAuth(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`, {cache: "no-store"});
  },

  // ADD product to cart
  async addToCart(productId: string, quantity: number) {
    return await fetchWithAuth(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({productId, quantity}),
    });
   
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
  async clearCart() {
    const res = await fetch("/api/cart/clear", {method: "POST"});
    if (!res.ok) throw new Error("Failed to clear cart");
    return res.json();
  },
};
