import { CartItemDTO } from "@/services/dto/cart.dto";

export const CalcCartTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.jacketItem.jacket.price;

    
    return (Number(item.colors[0].price)) * item.quantity;
};    