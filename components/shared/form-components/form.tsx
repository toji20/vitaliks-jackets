import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
import { FormInput } from './form-input';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
  totalAmount: number;
  submitting?: boolean;
  loading?: boolean;
}

export const Form: React.FC<React.PropsWithChildren<Props>> = ({ 
  className, 
  totalAmount,
  submitting,
  loading 
}) => {
  return (
    <div className={cn(
      className, 
      'h-full',
      'lg:bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:p-6'
    )}>
      <div className='mb-4 lg:mb-6'>
        <h2 className='text-base lg:text-lg font-semibold text-gray-900 mb-1 lg:mb-2'>Детали заказа</h2>
        <p className='text-gray-500 text-xs lg:text-sm'>Заполните информацию для доставки</p>
      </div>
      
      <div className='space-y-4 lg:space-y-6'>
        {loading ? (
          <div className='space-y-3 lg:space-y-4'>
            <Skeleton className="h-5 lg:h-6 w-32 bg-gray-200" />
            <Skeleton className="h-3 lg:h-4 w-24 bg-gray-200" />
          </div>
        ) : (
          <div className='bg-gray-50 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4'>
            <div className='flex justify-between items-center'>
              <span className='text-xs lg:text-sm font-medium text-gray-900'>Сумма заказа:</span>
              <span className='text-base lg:text-lg font-semibold text-gray-900'>{totalAmount.toFixed(2)} ₽</span>
            </div>
          </div>
        )}
        
        <div className='space-y-3 lg:space-y-4'>
          <div>
            <label htmlFor="phone" className='block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2'>
              Номер телефона
            </label>
            <FormInput 
              name='phone' 
              placeholder='Введите ваш номер телефона'
              className='w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all duration-200 text-xs lg:text-sm'
            />
          </div>
          
          <div>
            <label htmlFor="address" className='block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2'>
              Адрес доставки
            </label>
            <FormInput 
              name='address' 
              placeholder='Введите адрес доставки'
              className='w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all duration-200 text-xs lg:text-sm'
            />
          </div>
          
          <Button 
            type='submit' 
            className={cn(
              'w-full bg-black text-white py-2 lg:py-3 px-4 lg:px-6 rounded-lg font-medium cursor-pointer transition-all hover:bg-gray-800 mt-3 lg:mt-4 text-xs lg:text-sm',
              (loading || submitting) && 'opacity-70 cursor-wait'
            )} 
            loading={loading || submitting}
          >
            {submitting ? 'Обработка...' : 'Оформить заказ'}
          </Button>
        </div>
      </div>
    </div>
  );
};