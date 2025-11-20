import { CartItemDTO } from "@/services/dto/cart.dto";

export const CalcCartTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.jacketItem.jacket.price;

    
    return (Number(item.jacketItem.jacket.price)) * item.quantity;
};    