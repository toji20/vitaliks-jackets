'use client'

import { cn } from '@/lib/utils';
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Menu, X, ShoppingBag, Search, User, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { MusicVisualizerIcon } from './musiv-visualiser';

interface Props {
  className?: string;
}

export const Header: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const pathname = usePathname();
    const { items, removeCartItem, totalAmount } = useCart();
    const cartRef = useRef<HTMLDivElement>(null);
    
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); 
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const toggleCart = () => {
        if (isMobile) {
            window.location.href = '/checkout';
        } else {
            setIsCartOpen(!isCartOpen);
        }
    }

    const handleCartClick = () => {
        if (isMobile) {
            window.location.href = '/checkout';
        } else {
            setIsCartOpen(!isCartOpen);
        }
    }

    const navItems = [
        { name: 'Каталог', href: '/catalog' },
        { name: 'Зимние', href: '/winter-jackets' },
        { name: 'Весенние', href: '/spring-jackets' },
        { name: 'Осенние', href: '/autumn-jackets' },
    ];

    if (pathname === '/checkout') {
        return null;
    }

    if (pathname === '/admin-panel') {
        return null;
    }
    if (pathname === '/admin') {
        return null;
    }

    if (pathname === '/not-found') {
        return null;
    }

    const shouldAlwaysShowBackground = pathname === '/catalog' || pathname.startsWith('/product/') || '/winter-jackets' || '/spring-jackets' || '/autumn-jackets';
    
    const getHeaderBackground = () => {
        if (pathname === '/') {
            return isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent';
        } else {
            return shouldAlwaysShowBackground || isScrolled ? 'bg-stone-50 shadow-sm' : 'bg-transparent';
        }
    };

const getTextColor = (isHover = false) => {
        if (pathname === '/') {
            return isHover ? 'text-gray-200' : 'text-white';
        } else {
            if (shouldAlwaysShowBackground || isScrolled) {
                return isHover ? 'text-gray-900' : 'text-gray-600';
            } else {
                return isHover ? 'text-gray-200' : 'text-white';
            }
        }
    };

    const getBgIcon = (isHover = false) => {
        if (pathname === '/') {
            return 'bg-white';
        } else {
            if (shouldAlwaysShowBackground || isScrolled) {
                return 'bg-black';
            } else {
                return 'bg-white';
            }
        }
    };

    const shouldShowBackground = shouldAlwaysShowBackground || isScrolled;

    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <header className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                getHeaderBackground(),
                className)}>
                <div className="w-full mx-auto lg:py-2 py-0 lg:px-10 px-5">
                    <div className="flex items-center justify-between h-16">
                        <div className='flex items-center gap-4 lg:gap-20'>
                            <button 
                                className={cn(
                                    "lg:hidden p-2 transition-colors duration-200",
                                    getTextColor(true)
                                )}
                                onClick={toggleMobileMenu}
                                aria-label="Открыть меню"
                            >
                                {isMobileMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>

                            <Link href="/" className="flex-shrink-0 lg:mr-40 xl:mr-0">
                            {
                                        pathname !== '/' ? (
                                            <img src="/vitalik-logo-white.png" alt="" className='md:w-30 w-25'/>
                                        ) : (
                                            <img src="/vitalik-logo.png" alt="" className='md:w-30 w-25'/>
                                        )
                                    }
                            </Link>
                        </div>

                        <nav className="hidden lg:flex items-center gap-8 ml-[-48%]">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'text-[18px] font-light transition-colors duration-200 hover:scale-110 hover:text-amber-400 transition-all duration-500',
                                        getTextColor(),
                                        pathname === item.href && 'font-medium scale-110 text-amber-400 transition-all duration-500'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link 
                                href="/catalog" 
                                className={cn(
                                    "p-2 transition-colors duration-200 hover:scale-110 hover:text-amber-400 transition-all duration-500",

                                getTextColor(true)
                                )}
                            >
                                <Search size={20} />
                            </Link>
                            <Link 
                                href="/contacts"
                                className={cn(
                                    "hidden sm:flex items-center gap-2 transition-colors duration-200 hover:scale-110 hover:text-amber-400 transition-all duration-500",
                                    getTextColor(true)
                                )}
                            >
                                <MapPin size={16} />
                                <span className="text-sm font-medium">Контакты</span>
                            </Link>
                            
                            <div 
                                className="relative"
                                ref={cartRef}
                            >
                                {isMobile ? (
                                    <Link
                                        href="/checkout"
                                        className={cn(
                                            "p-2 relative hover:scale-110 hover:text-amber-400 transition-all duration-500 cursor-pointer",
                                            getTextColor(true)
                                        )}
                                    >
                                        <ShoppingBag size={20} />
                                        {cartItemsCount > 0 && (
                                            <span className={cn(
                                                "absolute top-6 left-3 text-xs rounded-full w-4 h-4 flex items-center justify-center",
                                                pathname === '/' ? "bg-white text-black" : "bg-black text-white"
                                            )}>
                                                {cartItemsCount}
                                            </span>
                                        )}
                                    </Link>
                                ) : (
                                    <>
                                        <button 
                                            onClick={handleCartClick}
                                            className={cn(
                                                "p-2 relative hover:scale-110 hover:text-amber-400 transition-all duration-500 cursor-pointer",
                                                getTextColor(true)
                                            )}
                                        >
                                            <ShoppingBag size={20} />
                                            {cartItemsCount > 0 && (
                                                <span className={cn(
                                                    "absolute top-0 right-0 text-xs rounded-full w-4 h-4 flex items-center justify-center",
                                                    pathname === '/' ? "bg-white text-black" : "bg-black text-white"
                                                )}>
                                                    {cartItemsCount}
                                                </span>
                                            )}
                                        </button>
                                        <div className={cn(
                                            "absolute right-2 top-full -mt-1 w-80 bg-white border border-gray-200 shadow-lg z-50 transition-all duration-300 transform origin-top-right",

                                                isCartOpen && items.length > 0 
                                                ? "opacity-100 scale-100 translate-y-0" 
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                        )}>
                                            <div className="p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-900">Корзина</h3>
                                                    <span className="text-sm text-gray-500">{items.length} товаров</span>
                                                </div>
                                                <div className="max-h-60 overflow-y-auto space-y-3 scrollbar-w-[1px]"
                                                style={{
                                                    scrollbarWidth: 'thin'
                                                }}>
                                                    {items.map((item) => (
                                                        <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0 px-1">
                                                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                                                                <img 
                                                                    src={item.color.imageUrl} 
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                                <p className="text-sm text-gray-600">{Number(item.price)} ₽ × {item.quantity}</p>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <p className="text-sm font-semibold text-gray-900">
                                                                    {(Number(item.price) * item.quantity).toFixed(2)} ₽
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-sm font-medium text-gray-900">Итого:</span>
                                                        <span className="text-lg font-semibold text-gray-900">{totalAmount.toFixed(2)} ₽</span>
                                                    </div>
                                                    <Link
                                                        href="/checkout"
                                                        className="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 text-center block"

                                                    onClick={() => setIsCartOpen(false)}
                                                    >
                                                        Перейти к оформлению
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 transform origin-top-right",
                                            isCartOpen && items.length === 0 
                                                ? "opacity-100 scale-100 translate-y-0" 
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                        )}>
                                            <div className="p-6 text-center">
                                                <ShoppingBag size={32} className="text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-600 text-sm mb-3">Ваша корзина пуста</p>
                                                <Link 
                                                    href="/catalog"
                                                    className="text-sm text-black font-medium hover:text-gray-700 transition-colors"
                                                    onClick={() => setIsCartOpen(false)}
                                                >
                                                    Перейти в каталог
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <MusicVisualizerIcon bg={getBgIcon()}/>
                        </div>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-51 lg:hidden overflow-hidden w-full block"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className={cn(
                'fixed top-0 left-0 h-full w-4/5 max-w-sm z-52 lg:hidden transition-transform duration-300 ease-in-out transform',
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
                <div className={cn(
                    'h-full flex flex-col transition-colors duration-300',
                    pathname === '/' 
                        ? 'bg-black backdrop-blur-sm' 
                        : 'bg-white'
                )}>
                    <div className="flex items-center justify-between p-5">
                    <Link href={'/'}>
                    {
                     pathname !== '/' ? (
                    <img src="/vitalik-logo-white.png" alt="" className='md:w-30 w-25'/>
                    ) : (
                    <img src="/vitalik-logo.png" alt="" className='md:w-30 w-25'/>
                    )
                    }</Link>
                        <button 
                            onClick={toggleMobileMenu}
                            className={cn(
                                "p-2 transition-colors duration-200",
                                pathname === '/' ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
                            )}
                            aria-label="Закрыть меню"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 p-6">
                        <div className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'lg:text-lg text-sm font-medium py-2 transition-all duration-200 hover:translate-x-2',
                                        pathname === '/' 
                                            ? (pathname === item.href ? 'text-white' : 'text-gray-300 hover:text-white')
                                            : (pathname === item.href ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900')
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/contacts"
                                className={cn(
                                    "flex items-center lg:gap-3 gap-1 lg:text-lg text-sm font-medium lg:py-2 py-1 transition-all duration-200 hover:translate-x-2 sm:hidden",
                                    pathname === '/' ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <MapPin className='w-4 lg:w-10' />
                                Контакты
                            </Link>
                        </div>
                    </nav>

                    <div className={cn(
                        "p-6 border-t",
                        pathname === '/' ? "border-white/20" : "border-gray-200"
                    )}>
                        <div className={cn(
                            "text-sm",
                            pathname === '/' ? "text-gray-400" : "text-gray-500"
                        )}>
                            МАГАЗИН КУРТОК
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};