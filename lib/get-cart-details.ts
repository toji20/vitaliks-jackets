import { Color, Size } from '@prisma/client';
import { CartDTO } from '../services/dto/cart.dto';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number | null;
    disabled?: boolean;
    size: Size;
    color: Color;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items?.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.jacketItem.jacket.name,
    imageUrl: item.jacketItem.jacket.imageUrl,
    price: item.colors[0].price ?? 0,
    disabled: false,
    size: item.sizes[0] || undefined,
    color: item.colors[0] || undefined
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};