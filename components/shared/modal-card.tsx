'use client'

import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import '@/styles/modal/jacket-page.css';
import { JacketItem, Size } from '@prisma/client';
import { SizesItem } from './sizes-item';

interface Props {
  className?: string;
  image: string;
  name: string;
  price: number;
  descr: string;
  items: JacketItem[]
  sizes: Size[];
  size?: string;
  id: number;
  loading?: boolean;
  onClickAddCart?: VoidFunction;
  onSubmit: (jacketItemId: number, sizes: number[]) => void;
  onClose?:() => void
}   

export const JacketModalPage: React.FC<React.PropsWithChildren<Props>> = ({
  image,
  name,
  price,
  descr,
  sizes,
  id,
  size,
  items,
  loading,
  onClickAddCart,
  onSubmit,
  onClose
}) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const handleBack = () => {
    onClose?.()
  };

  const handleSizeClick = (size: Size) => {
    setSelectedSize(prev => prev?.id === size.id ? null : size);
  };

  const handleClickAdd = () => {
    if (id && selectedSize !== null) {
      onSubmit(id, [selectedSize.id]);
    }
  };

  const isAddButtonDisabled = !selectedSize;

  return (
    <div className={cn('jacket-modal__overlay', 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-5')}>
      <div className={cn('jacket-modal__content', 'bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative')}>
        <button 
          className={cn('jacket-modal__close-btn', 'absolute top-4 right-4 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10')} 
          onClick={handleBack}
        >
          <ArrowLeft size={20}/>
        </button>
        
        <div className={cn('jacket-modal__container', 'grid grid-cols-1 md:grid-cols-2 min-h-[500px] h-full')}>
          <div className={cn('jacket-modal__image-section', 'bg-gray-50 flex items-center justify-center')}>
            <img 
              src={image} 
              alt={name} 
              className={cn('jacket-modal__image', 'w-auto h-auto max-w-full max-h-full object-cover')}
            />
          </div>  
          
          <div className={cn('jacket-modal__info-section', 'p-8 flex flex-col bg-white overflow-y-auto')}>
            <div className={cn('jacket-modal__header', 'mb-5 pb-5 border-b border-gray-100')}>
              <h1 className={cn('jacket-modal__title', 'text-2xl font-semibold text-gray-900 mb-2')}>{name}</h1>
              <p className={cn('jacket-modal__category', 'text-gray-600 mb-3')}>Mens Jacket</p>
              <p className={cn('jacket-modal__price', 'text-xl font-bold text-gray-900')}>{price} ₽</p>
            </div>

            <p className={cn('jacket-modal__description', 'text-gray-700 leading-relaxed mb-6')}>{descr}</p>

            {/* Size Selection */}
            <div className={cn('jacket-modal__size-section', 'mb-6')}>
              <h3 className={cn('jacket-modal__section-title', 'font-semibold text-gray-900 mb-4')}>Select Size</h3>
              <div className={cn('jacket-modal__sizes-grid', 'grid grid-cols-3 sm:grid-cols-4 gap-3 mb-2')}>
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeClick(size)}
                    className={cn(
                      'jacket-modal__size-btn',
                      'border-2 border-gray-200 rounded-lg bg-white cursor-pointer transition-all duration-200 font-medium text-gray-800 flex items-center justify-center min-h-[50px] py-3 px-2',
                      selectedSize?.id === size.id && 'jacket-modal__size-btn--selected border-black bg-black text-white'
                    )}
                  >
                    <SizesItem 
                      name={String(size.name)}
                      active={selectedSize?.id === size.id} // Передаем активное состояние
                    />
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="jacket-modal__error-text text-red-600 text-sm mt-2">Please select a size</p>
              )}
            </div>

            <button
              onClick={handleClickAdd}
              disabled={isAddButtonDisabled || loading}
              className={cn(
                'jacket-modal__add-btn',
                'mt-auto bg-black text-white py-4 px-6 rounded-lg font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wide',
                isAddButtonDisabled && 'jacket-modal__add-btn--disabled bg-gray-300 text-gray-500 cursor-not-allowed',
                loading && 'opacity-70 cursor-wait'
              )}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};