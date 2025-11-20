'use client'

import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import '@/styles/main-bg.css'

interface Props {
    className?: string;
    title: string;
    btnText?: string;
    url?: string;
    subtitle?: string;
}

export const Bg: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  btnText = 'Перейти в каталог',
  url = '/catalog',
  subtitle = 'Качественные куртки на любой сезон'
}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div className="overflow-hidden max-h-[99vh]">
          <section className="relative w-full min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
            <div 
                className={cn(
                    "main-bg absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out",
                    isHovered ? "scale-110" : "scale-100"
                )}
            />
            
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center">
                <div 
                    className="space-y-8"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h1 className={cn(
                        "w-[250px] md:w-[400px] lg:w-[500px] leading-tight transition-all duration-500 flex mx-auto",
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-95"
                    )}>
                        <img src="/vitalik-logo.png" alt="" className="w-full h-full mx-auto"/>
                    </h1>
                    
                    <p className={cn(
                        "md:text-xl text-sm text-white/90 max-w-2xl mx-auto transition-all duration-500 delay-100",
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}>
                        {subtitle}
                    </p>
                    
                    <div className={cn(
                        "transition-all duration-500 delay-200",
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}>
                        <Link 
                            href={'/catalog'}
                            className="inline-flex items-center gap-3 bg-white text-gray-900 lg:px-8 lg:py-4 px-6 py-3 rounded-[3px] font-medium hover:bg-gray-50 transition-all duration-300 group border border-gray-200 hover:border-gray-300"
                        >
                            <span className="lg:text-sm text-[12px] uppercase tracking-wide">{btnText}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="text-center flex flex-col items-center">
                    <div className="text-white md:text-sm text-[12px] mb-2">Откройте коллекцию</div>
                    <div className="md:w-6 md:h-10 w-5 h-8 border-2 border-white rounded-full flex justify-center">
                        <div className="md:w-1 md:h-3 w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}