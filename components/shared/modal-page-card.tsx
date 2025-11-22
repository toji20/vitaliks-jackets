'use client'

import { cn } from '@/lib/utils';
import { Jacket, Color } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface JacketCardProps {
  jacket: Jacket;
  className?: string;
}

export const ModalJacketCard: React.FC<JacketCardProps> = ({ jacket, className }) => {
  const mainImage = jacket.imageUrl || '/fallback-image.jpg';

  return (
    <div className={cn(
      'group bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 relative',
      'md:hover:shadow-xl',
      className
    )}>
      <div className='relative overflow-hidden bg-gray-50'>
        <Link href={`/product/${jacket.id}`}>
          <div className='aspect-[3/5] lg:aspect-[3/4] relative overflow-hidden'>
            <img
              src={mainImage}
              alt={jacket.name}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
            />
          </div>
        </Link>
        <div className='absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-1 md:gap-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300'>
          <button className='w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 rounded'>
            <svg className='w-3 h-3 md:w-5 md:h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>

        <div className='absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent'>
          <div className='space-y-1 md:space-y-2 text-white'>
            <Link href={`/product/${jacket.id}`}>
              <h3 className={cn(
                'font-semibold leading-tight line-clamp-2 hover:text-gray-300 transition-colors',
                'text-sm md:text-lg',
                'min-h-[2.5rem] md:min-h-0'
              )}>
                {jacket.name}
              </h3>
            </Link>

            <div className='flex items-baseline justify-between'>
              <div className='flex items-baseline gap-1 md:gap-2'>
                {jacket.price ? (
                  <>
                    <span className='text-base md:text-xl font-bold'>
                      {Number(jacket.price).toLocaleString('ru-RU')} ₽
                    </span>
                  </>
                ) : (
                  <span className='text-base md:text-xl font-bold'>
                    {jacket.price || '0'} ₽
                  </span>
                )}
              </div>
              
              <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded'>
                <div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full' />
                <span className='text-[10px] md:text-xs uppercase tracking-wide hidden xs:inline'>
                  In Stock
                </span>
              </div>
            </div>

            <Link href={`/product/${jacket.id}`}>
              <button className={cn(
                'w-full bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300',
                'flex items-center justify-center gap-1 md:gap-2 uppercase tracking-wide group/btn',
                'py-2 md:py-3 px-2 md:px-4',
                'text-xs md:text-sm',
                'hover:scale-105'
              )}>
                <svg className='w-3 h-3 md:w-4 md:h-4 transition-transform group-hover/btn:scale-110' 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className='whitespace-nowrap'>В корзину</span>
              </button>
            </Link>
          </div>
        </div>

        <div className='md:hidden absolute top-2 right-2 opacity-100 md:opacity-0'>
          <Link href={`/product/${jacket.id}`}>
            <button className='w-8 h-8 bg-black/80 text-white flex items-center justify-center rounded-full hover:bg-black transition-all duration-200 active:scale-95'>
              <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {className?.includes('flex') && (
        <div className='flex-1 p-4 hidden md:block'>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-gray-900'>{jacket.name}</h3>
            <p className='text-gray-600 text-sm line-clamp-3'>
              {jacket.descr || 'Описание товара отсутствует'}
            </p>
            <div className='flex items-center justify-between'>
              <span className='text-xl font-bold text-gray-900'>
                {Number(jacket.price).toLocaleString('ru-RU')} ₽
              </span>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full' />
                <span className='text-xs text-gray-500'>В наличии</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};