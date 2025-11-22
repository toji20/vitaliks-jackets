'use client'

import React from 'react';
import { ModalJacketCard } from './modal-page-card';
import { cn } from '@/lib/utils';
import { Jacket } from '@prisma/client';

interface YouMayAlsoLikeProps {
  jackets: Jacket[];
  currentJacketId?: number;
  className?: string;
}

export const YouMayAlsoLike: React.FC<YouMayAlsoLikeProps> = ({ 
  jackets, 
  currentJacketId,
  className 
}) => {
  const filteredJackets = jackets.slice(0, 8);

  if (filteredJackets.length === 0) {
    return null;
  }

  return (
    <section className={cn('you-may-also-like py-16 bg-stone-50', className)}>
      <div className='max-w-8xl mx-auto px-4 sm:px-8 lg:px-10'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-light text-gray-900 mb-4'>
            Вам может понравиться
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Откройте для себя другие стильные куртки из нашей коллекции
          </p>
        </div>

        <div className='you-may-also-like__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {filteredJackets.map((jacket) => (
            <ModalJacketCard
              key={jacket.id}
              jacket={jacket}
              className='h-full'
            />
          ))}
        </div>

        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/4 right-1/5 w-2 h-2 bg-[#ffe6b6] rounded-full animate-float'></div>
          <div className='absolute bottom-1/4 left-1/4 w-1 h-1 bg-[#ffe6b6] rounded-full animate-float-delayed'></div>
        </div>
      </div>
    </section>
  );
};