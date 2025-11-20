'use client'

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  price: number;
  name: string;
  image: string;
  descr?: string;
  id: number
}

export const JacketsCard: React.FC<React.PropsWithChildren<Props>> = ({ 
  className, 
  price, 
  name, 
  image, 
  descr,
  id
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className={cn('bg-white shadow-lg border border-stone-200 overflow-hidden group cursor-pointer w-full w-85', className)}
      >
        <Link href={`/product/${id}`}>
        <div className="flex flex-col h-full">
          <div 
            className="relative overflow-hidden bg-stone-100 flex-1 min-h-[350px]"
          >
            <img
              src={image} 
              alt={name} 
              className="object-cover transition-transform duration-300 group-hover:scale-105 h-full"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
          <div className="p-6 space-y-3">
            <div className='flex justify-between items-start gap-4'>
              <h3 className="text-xl font-semibold text-stone-800 flex-1">{name}</h3>
              <div className="text-lg font-bold text-stone-800 whitespace-nowrap">
                {formatPrice(price)} ₽
              </div>
            </div>
            {descr && (
              <p className="text-stone-600 text-sm line-clamp-2">
                {descr}
              </p>
            )}
            <button 
              className="w-full mt-4 bg-stone-800 text-amber-50 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors duration-200 border border-stone-700"
            >
              Подробнее
            </button>
          </div>
        </div>
        </Link>
      </motion.div>
    </>
  );
};