import { ICartInfo, ICartItem } from "@core/models/order";
import { createContext, useContext } from "react";
import { ICartContext } from "../../core/models/config";


export const defaultCartState: ICartItem[] = []

export const CartContext = createContext<ICartContext>({
  carts: defaultCartState,
  addToCart: () => ({}),
  deleteCart: () => ({}),
  updateCart: () => ({}),
  setLoading: () => ({}),
  loading: false,
  cartInfo: {} as ICartInfo
})

const useCartContext = () => useContext(CartContext);
export default useCartContext;
