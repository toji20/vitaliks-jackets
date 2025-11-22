import { z } from 'zod';

export const colorSchema = z.object({
  name: z.string().min(1, "Название цвета обязательно"),
  imageUrl: z.string().url("Должна быть валидная ссылка"),
  imageUrlTwo: z.string().url().optional().nullable(),
  imageUrlThree: z.string().url().optional().nullable(),
  imageUrlFour: z.string().url().optional().nullable(),
});

export const sizeSchema = z.object({
  name: z.string().min(1, "Название размера обязательно"),
  price: z.number().int().nonnegative().optional(),
  imageUrl: z.string().url("Должна быть валидная ссылка").optional().nullable(),
});

export const createJacketSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  imageUrl: z.string().url("Должна быть валидная ссылка"),
    
  price: z.number().int().nonnegative().optional().nullable(),
  descr: z.string().optional().nullable(),
  
  material: z.string().optional().nullable(),
  waterproof: z.string().optional().nullable(),
  insulation: z.string().optional().nullable(),
  season: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  care: z.string().optional().nullable(),
  
  categoryId: z.number().int().positive("ID категории обязателен"),
  
  colors: z.array(colorSchema).min(1, "Добавьте хотя бы один цвет"),
  sizes: z.array(sizeSchema).min(1, "Добавьте хотя бы один размер"),
});

export type TcreateJacketShema = z.infer<typeof createJacketSchema>

export const CategorySchema = z.object({
    name: z.string().min(1,'Напишите название категории')
  })
  
  export type TCategorySchema = z.infer<typeof CategorySchema>

  export const passswordSchema = z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов' })

export const FormLoginSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: passswordSchema,
})

export const FormRegisterSchema = FormLoginSchema.merge(
    z.object({
        fullName: z.string().min(2, { message: 'Имя и фамилия должно содержать не менее 2-х символов' }),
        confirmPassword: passswordSchema,
    })
).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
})

export type TFormLoginValues = z.infer<typeof FormLoginSchema>;
export type TFormRegisterValues = z.infer<typeof FormRegisterSchema>;
