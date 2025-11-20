'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '@/styles/nav-bg.css';

interface Props {
  className?: string;
}

export const NavBg: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const [background, setBackground] = useState('/nav-bg-vt-jack.png');
    const [isHovered, setIsHovered] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = [
        { 
            title: 'ВСЕ КУРТКИ', 
            href: '/catalog',
            color: 'text-amber-300',
            hover: 'hover:border-amber-300/60'
        },
        { 
            title: 'ОСЕННИЕ КУРТКИ', 
            href: '/autumn-jackets',
            color: 'text-amber-300',
            hover: 'hover:border-amber-300/60'
        },
        { 
            title: 'ЗИМНИЕ КУРТКИ', 
            href: '/winter-jackets',
            color: 'text-amber-300',
            hover: 'hover:border-amber-300/60'
        },
        { 
            title: 'ВЕСЕННИЕ КУРТКИ', 
            href: '/spring-jackets',
            color: 'text-amber-300',
            hover: 'hover:border-amber-300/60'
        }
    ];

    return (
        <div className="overflow-hidden max-h-[99vh]">
            <section className="relative w-full min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
                <div 
                    className={cn(
                        "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out",
                        isHovered ? "scale-105 brightness-110" : "scale-100 brightness-100"
                    )}
                    style={{ backgroundImage: `url(${background})` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
                
                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 -top-8 md:-top-11">
                    <div 
                        className="space-y-8 md:space-y-16 text-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="mb-6 md:mb-8">
                            <h1 className={cn(
                                "text-2xl md:text-4xl lg:text-6xl font-light text-white leading-tight transition-all duration-700 mb-4 md:mb-8 px-2",
                            )}>
                                ВСЕ КУРТКИ ПО СЕЗОНАМ
                            </h1>
                            
                            <p className={cn(
                                "text-sm md:text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 px-4",
                            )}>
                                Откройте для себя идеальную куртку для любого времени года
                            </p>
                        </div>
                        
                        <div className={cn(
                            "transition-all duration-700 delay-300 w-full",
                        )}>
                            <div className="grid grid-cols-1 gap-4 md:gap-3 max-w-full mx-auto">
                                {categories.map((category, index) => (
                                    <Link 
                                        key={category.title}
                                        href={category.href}
                                        className={cn(
                                            "group relative py-4 md:py-6 px-4 md:px-8 backdrop-blur-sm border transition-all duration-500",
                                            category.hover,
                                            activeCategory === category.title 
                                                ? "bg-white/10 scale-[1.02] border-opacity-80" 
                                                : "bg-white/5 border-opacity-30 hover:bg-white/10 hover:scale-[1.02]"
                                        )}
                                        onMouseEnter={() => setActiveCategory(category.title)}
                                        onMouseLeave={() => setActiveCategory(null)}
                                        onTouchStart={() => setActiveCategory(category.title)}
                                        onTouchEnd={() => setActiveCategory(null)}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span className={cn(
                                                "text-sm md:text-lg font-light transition-all duration-300 text-center",
                                                category.color,
                                                activeCategory === category.title ? "text-opacity-100 text-white" : "text-opacity-90 text-white"
                                            )}>
                                                {category.title}
                                            </span>
                                        </div>
                                        <div className={cn(
                                            "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-500",
                                            category.color.replace('text-', 'bg-'),
                                            activeCategory === category.title 
                                                ? "w-full opacity-80" 
                                                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                                        )} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                
                <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="text-center flex flex-col items-center">
                        <div className="text-white text-xs md:text-sm mb-2">Откройте коллекцию</div>
                        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-2 md:w-1 md:h-3 bg-white rounded-full mt-2 animate-bounce" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};