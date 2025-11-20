import { z } from 'zod';

export const checkoutFormSchema = z.object({
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
