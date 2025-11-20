// components/shared/cart-item.tsx
import { cn } from '@/lib/utils';
import React from 'react';
import { TrashIcon } from 'lucide-react';
import { CountButton } from './count-button';

interface Props {
  className?: string;
  image: string;
  name: string;
  price: number;
  disabled?: boolean;
  size: string;
  colorName: string;
  onClickRemove?: () => void;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  quantity?: number;
}

export const CartItem: React.FC<React.PropsWithChildren<Props>> = ({ 
  className, 
  name,
  image,
  price,
  size,
  colorName,
  onClickRemove,
  onClickCountButton,
  quantity,
  disabled,
}) => {
  const totalPrice = price * Number(quantity);
  
  return (
    <div className={cn(
      'py-3 lg:py-4',
      'lg:flex lg:items-center lg:justify-between lg:border-b lg:border-gray-200 lg:last:border-b-0',
      {
        'opacity-50 pointer-events-none': disabled,
      },
      className
    )}>
      {/* Мобильная версия - вертикальная */}
      <div className='lg:hidden'>
        <div className='flex items-start gap-3 mb-3'>
          <div className='w-20 h-28 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0'>
            <img 
              src={image} 
              alt={name} 
              className='w-full h-full object-cover'
            />
          </div>
          
          <div className='flex-1 min-w-0'>
            <p className='text-gray-900 font-medium text-sm mb-1 line-clamp-2'>{name}</p>
            <p className='text-gray-600 text-sm mb-2'>{price} ₽</p>
            <p className='text-gray-600 text-sm mb-2'>{size} | {colorName}</p>
          </div>
        </div>
        
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <CountButton
              onClick={onClickCountButton} 
              value={quantity} 
              size="sm"
            />
          </div>
          
          <div className='flex items-center gap-3'>
            <div className='text-sm font-semibold text-gray-900'>
              {totalPrice.toFixed(2)} ₽
            </div>
            
            <button 
              onClick={onClickRemove}
              className='p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
            >
              <TrashIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Десктопная версия - горизонтальная */}
      <div className='hidden lg:flex lg:items-center lg:gap-4 lg:flex-1'>
        <div className='w-20 h-28 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0'>
          <img 
            src={image} 
            alt={name} 
            className='w-full h-full object-cover'
          />
        </div>
        
        <div className='flex-1 min-w-0'>
          <p className='text-gray-900 font-medium text-sm mb-1 truncate'>{name}</p>
          <p className='text-gray-600 text-sm mb-2'>{price} ₽</p>
          <p className='text-gray-600 text-sm mb-2'>{size} | {colorName}</p>
          
          <div className='flex items-center gap-3'>
            <CountButton
              onClick={onClickCountButton} 
              value={quantity} 
            />
          </div>
        </div>
      </div>
      
      <div className='hidden lg:flex lg:items-center lg:gap-4'>
        <div className='text-sm font-semibold text-gray-900 text-right'>
          {totalPrice.toFixed(2)} ₽
        </div>
        
        <button 
          onClick={onClickRemove}
          className='p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  );
};