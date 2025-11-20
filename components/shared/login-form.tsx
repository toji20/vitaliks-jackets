import React, { use } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormLoginSchema, TFormLoginValues } from "@/lib/schema";
import { Title } from "../ui/title";
import { FormInput } from "./form-components/form-input";

interface Props {
}

export const LoginForm: React.FC<Props> = () => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues:{
            email: '',
            password: '',
        },
    });
    const router = useRouter()
    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
              ...data,
              redirect: false,
            });
      
            if (!resp?.ok) {
              throw Error();
            }
      
            toast.success('Вы успешно вошли в аккаунт', {
              icon: '✅',
            });
            router.push('/admin-panel')
            router.refresh()
      
          } catch (error) {
            console.error('Error [LOGIN]', error);
            toast.error('Не удалось войти в аккаунт', {
              icon: '❌',
            });
          }
    };

    return (
        <FormProvider {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center text-center">
          <div className="mr-2">
            <Title text="Вход в админ-панель" size="md" className="font-bold text-center" />
            <p className="text-gray-400">Введите свою почту, чтобы войти как админ</p>
          </div>
        </div>

        <FormInput name="email" required/>
        <FormInput name="password" type="password" />

        <Button className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
        </FormProvider>
    );
};