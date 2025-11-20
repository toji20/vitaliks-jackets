// components/shared/cart.tsx
import { cn } from '@/lib/utils';
import React from 'react';
import { CartStateItem } from '@/lib/get-cart-details';
import { useCart } from '@/hooks/use-cart';
import { CartItem } from './cart-item';
import { ShoppingBag } from 'lucide-react';

interface Props {
  className?: string;
  items: CartStateItem[];
  loading?: boolean;
  totalAmount: number;
}

export const Cart: React.FC<React.PropsWithChildren<Props>> = ({ 
  className, 
  items,
  loading,
  totalAmount
}) => {
  const { updateItemQuantity, removeCartItem } = useCart();
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className={cn(
      className, 
      'h-full flex flex-col',
      'lg:bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:p-6'
    )}>
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <h2 className='text-base lg:text-lg font-semibold text-gray-900'>Ваш заказ</h2>
        <span className='text-xs lg:text-sm text-gray-500'>{items.length} товаров</span>
      </div>
      <div className="h-px bg-gray-100 " />

      <div className={cn(
        'flex-1 overflow-y-auto max-h-[280px] lg:max-h-[310px]',
        'lg:pr-2'
      )}>
        {loading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className="mb-3 lg:mb-4">
              <div className="flex gap-3 lg:gap-4 p-3 lg:p-4">
                <div className="relative overflow-hidden rounded-lg w-16 h-20 lg:w-20 lg:h-24 bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
                </div>
                
                <div className="flex-1 space-y-2 lg:space-y-3">
                  <div className="h-3 lg:h-4 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                  <div className="h-3 lg:h-4 bg-gray-200 rounded-full w-1/2 animate-pulse" />
                  <div className="h-3 lg:h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" />
                  
                  <div className="flex gap-1 lg:gap-2 pt-1 lg:pt-2">
                    <div className="h-6 w-6 lg:h-8 lg:w-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-6 lg:h-8 lg:w-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-6 lg:h-8 lg:w-8 bg-gray-200 rounded-full animate-pulse ml-auto" />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-100 lg:mt-4" />
            </div>
          ))
        ) : items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.id} className={cn(
              'border-b border-gray-100 last:border-b-0',
              'lg:border-0'
            )}>
              <CartItem
                name={item.name}
                price={Number(item.price)}
                image={item.color.imageUrl}
                disabled={item.disabled}
                colorName={String(item.color.name)}
                size={String(item.size.name)}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
                quantity={item.quantity}
              />
              {index < items.length - 1 && (
                <div className="h-px bg-gray-100 mt-3 lg:mt-4 lg:hidden" />
              )}
            </div>
          ))
        ) : (
          <div className='text-center py-8 lg:py-12'>
            <div className='w-12 h-12 lg:w-16 lg:h-16 bg-white flex items-center justify-center mx-auto mb-3 lg:mb-4'>
              <ShoppingBag size={20} className='text-gray-400 lg:size-6' />
            </div>
            <p className='text-gray-600 text-xs lg:text-sm'>Ваша корзина пуста</p>
          </div>
        )}
      </div>
      
      {!loading && items.length > 0 && (
        <div className='mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200'>
          <div className='flex justify-between items-center text-base lg:text-lg font-semibold text-gray-900'>
            <span>Итого:</span>
            <span>{totalAmount.toFixed(2)} ₽</span>
          </div>
        </div>
      )}
    </div>
  );
};