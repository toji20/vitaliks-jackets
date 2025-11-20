'use client'

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Category } from '@prisma/client';
import { usePathname } from 'next/navigation';

interface FooterProps {
  className?: string;
  categories?: Category[]
}

export const Footer: React.FC<FooterProps> = ({ className,categories }) => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname()

  if (pathname === '/not-found') {
    return null;
}

  return (
    <footer className={cn('bg-[#e3e3e3] border-t border-gray-200', className)}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">JACKETSTORE</h3>
            </Link>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-xs text-xs sm:text-sm leading-relaxed">
              Качественные куртки на любой сезон. Современный дизайн, премиальные материалы и доступные цены.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Telegram"
              >
                <Send size={18} className="sm:size-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} className="sm:size-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} className="sm:size-5" />
              </a>
            </div>
          </div>

          <div className='md:block hidden'>
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide">
              Навигация
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: '/catalog', label: 'Каталог' },
                { href: '/winter-jackets', label: 'Зимние куртки' },
                { href: '/spring-jackets', label: 'Весенние куртки' },
                { href: '/autumn-jackets', label: 'Осенние куртки' },
                { href: '/contacts', label: 'Контакты' },
                { href: '/info-page', label: 'Информация для покупателя' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='md:block hidden'>
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide">
              Категории
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: '/catalog?category=winter', label: 'Зимние куртки' },
                { href: '/catalog?category=demiseason', label: 'Демисезонные' },
                { href: '/catalog?category=rain', label: 'Дождевики' },
                { href: '/catalog?category=wind', label: 'Ветровки' },
                { href: '/catalog?category=style', label: 'Стильные модели' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide">
              Контакты
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone size={14} className="text-gray-400 flex-shrink-0 sm:size-4" />
                <a
                  href="tel:+78001234567"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs sm:text-sm"
                >
                  +7 (800) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail size={14} className="text-gray-400 flex-shrink-0 sm:size-4" />
                <a
                  href="mailto:info@jacketstore.ru"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs sm:text-sm"
                >
                  info@jacketstore.ru
                </a>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin size={14} className="text-gray-400 flex-shrink-0 mt-0.5 sm:size-4" />
                <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  г. Москва, ул. Примерная, д. 123
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <h5 className="font-medium text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm">Время работы</h5>
              <div className="text-gray-600 text-xs sm:text-sm space-y-1">
                <p>Пн-Пт: 9:00 - 21:00</p>
                <p>Сб-Вс: 10:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-[#a6a5a4]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} JACKETSTORE. Все права защищены.
            </div>
            
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};