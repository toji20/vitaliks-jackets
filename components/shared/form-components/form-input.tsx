'use client';

import React from "react";
import { useFormContext } from "react-hook-form"
import { RequiredSymbol } from "./required-symbol";
import { Input } from "@/components/ui/input";
import { ClearButton } from "./clear-button";
import { ErrorText } from "./error-text";
import '@/styles/order.css';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({
    label,
    name,
    required,
    className,
    ...props
}) => {
    const {
        formState: { errors },
        register,
        watch,
        setValue
    } = useFormContext()

    const value = watch(name);
    const errorText = errors[name]?.message as string;
    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true });
      };
    return (
        <div className={className}>
            {
                label && (
                    <p className="font-medium mb-2">
                        {label} {required && <RequiredSymbol />}
                    </p>
                )
            }

            <div className="relative">
                <Input className='order__input realative' {...register(name)} {...props}/>

                {value && <ClearButton onClick={onClickClear}/>}
            </div>

            {errorText && <ErrorText text={errorText} className="order__input-error bsolute"/>}
        </div>
    )
}