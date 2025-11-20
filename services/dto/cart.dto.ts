import { Cart, CartItem, Color, Jacket, JacketItem, Size } from "@prisma/client";

export type CartItemDTO = CartItem & {
  jacketItem: JacketItem & {
    jacket: Jacket;
  };
  sizes: Size[];
  colors: Color[]
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  jacketItemId: number;
  sizes?: number[];
  colors?: number[];
}
