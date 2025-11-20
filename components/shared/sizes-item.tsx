import React from "react";
import { cn } from '@/lib/utils';

interface Props {
    name: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
}

export const SizesItem: React.FC<Props> = ({
    name,
    active,
    disabled,
    className
}) => {
    return (
        <div 
            className={cn(
                "w-full h-full flex items-center justify-center",
                "rounded-lg p-2 border-2 font-medium transition-all duration-300",
                "select-none relative",
                
                active && [
                    "bg-black border-black text-white",
                    "shadow-lg scale-105 ring-2 ring-black ring-opacity-20",
                    "hover:shadow-xl hover:scale-110"
                ],
                
                !active && !disabled && [
                    "bg-white border-gray-300 text-gray-700",
                    "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
                    "hover:scale-105 hover:-translate-y-0.5",
                    "cursor-pointer active:scale-95"
                ],
                
                disabled && [
                    "bg-gray-100 border-gray-200 text-gray-400",
                    "cursor-not-allowed",
                    "before:absolute before:inset-0 before:bg-gray-200 before:opacity-50"
                ],
                
                className
            )}
        >
            <span className={cn(
                "font-semibold tracking-wide text-sm transition-all duration-200",
                "relative z-10",
                
                active && [
                    "text-white font-bold",
                    "drop-shadow-sm"
                ],
                
                // Available text
                !active && !disabled && [
                    "text-gray-700 group-hover:text-gray-900"
                ],
                
                disabled && [
                    "text-gray-500",
                    "line-through decoration-gray-400 decoration-2"
                ]
            )}>
                {name}
            </span>

            {active && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/10 to-white/5 animate-pulse" />
            )}
        </div>
    );
};