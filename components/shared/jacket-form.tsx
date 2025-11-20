'use client'

import { cn } from '@/lib/utils';
import { ArrowLeft, Heart, Share2, ZoomIn, X, ChevronLeft, ChevronRight, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import '@/styles/modal/jacket-page.css';
import { Jacket, JacketItem, Size, Color } from '@prisma/client';
import { SizesItem } from './sizes-item';
import { useCart } from '@/hooks/use-cart';
import { YouMayAlsoLike } from './modal-page-cards-list';

export type IJacket = Jacket & { 
  items: JacketItem[]; 
  sizes: Size[];
  colors: Color[];
}

interface Props {
  className?: string;
  name: string;
  price: number;
  descr: string;
  items: IJacket;
  sizes: Size[];
  colors: Color[];
  id: number;
  loading?: boolean;
  material?: string;
  waterproof?: string;
  insulation?: string;
  season?: string;
  country?: string;
  care?: string;
  onSubmit?: (jacketItemId: number, sizes: number[], colors: number[]) => void;
  jackets: Jacket[];
}

export const JacketPage: React.FC<Props> = ({
  name,
  price,
  descr,
  sizes,
  colors,
  id,
  items,
  loading,
  material,
  waterproof,
  insulation,
  season,
  country,
  care,
  onSubmit,
  jackets,
}) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'characteristics'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copyTextMess, setCopyTextMess] = useState(false);
  const { addCartItem, loading: cartLoading } = useCart();

  // Фильтруем только активные цвета и размеры
  const enabledColors = colors.filter(color => color.disabled);
  const enabledSizes = sizes.filter(size => size.disabled);

  // Получаем все изображения из выбранного цвета
  const getCurrentColorImages = () => {
    if (!selectedColor) return [];
    
    const colorImages = [
      selectedColor.imageUrl,
      selectedColor.imageUrlTwo,
      selectedColor.imageUrlThree,
      selectedColor.imageUrlFour
    ].filter(Boolean) as string[];
    
    return colorImages.length > 0 ? colorImages : ['/fallback-image.jpg'];
  };

  const allImages = getCurrentColorImages();

  // Автоматически выбираем первый активный цвет при загрузке
  useEffect(() => {
    if (enabledColors.length > 0 && !selectedColor) {
      setSelectedColor(enabledColors[0]);
    }
  }, [enabledColors, selectedColor]);

  // Эффект для автоматического скрытия уведомления
  useEffect(() => {
    if (copyTextMess) {
      const timer = setTimeout(() => {
        setCopyTextMess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copyTextMess]);

  const handleBack = () => {
    router.back();
  };

  const handleSizeClick = (size: Size) => {
    if (!size.disabled) return; // Не позволяем выбирать отключенные размеры
    setSelectedSize(prev => prev?.id === size.id ? null : size);
  };

  const handleColorClick = (color: Color) => {
    if (!color.disabled) return; // Не позволяем выбирать отключенные цвета
    setCurrentImageIndex(0);
    setSelectedColor(color);
  };

  const handleAddToCart = async () => {
    if (id && selectedSize !== null && selectedColor !== null) {
      try {
        await addCartItem({
          jacketItemId: id,
          sizes: [selectedSize.id],
          colors: [selectedColor.id],
        });
        console.log({
          size: selectedSize,
          color: selectedColor
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

const closeZoom = () => {
    setIsZoomed(false);
  };

    useEffect(() => {
      if (isZoomed) {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
},[isZoomed])
  

  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyTextMess(true);
    } catch (err) {
      console.error('Ошибка при копировании:', err);
      setCopyTextMess(false);
    } 
  };

  const isAddButtonDisabled = !selectedSize || !selectedColor;

  return (
    <div className={cn('jacket-page min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 pb-11 md:pt-26 pt-15 bg-stone-50')}>
      {copyTextMess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-down">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Ссылка скопирована в буфер обмена!</span>
        </div>
      )}

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffe6b6] to-transparent '></div>
        <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffe6b6] to-transparent '></div>
        
        <div className='absolute top-1/4 left-1/5 w-2 h-2 bg-[#ffe6b6] rounded-full  animate-float'></div>
        <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-[#ffe6b6] rounded-full  animate-float-delayed'></div>
        <div className='absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-[#ffe6b6] rounded-full  animate-float-slow'></div>
      </div>

      <div className='max-w-[1380px] mx-auto lg:px-4 px-0 sm:px-8 lg:px-10 relative z-10'>
        <div className='block lg:hidden jacket-page__header mb-0'>
          <div className='bg-white p-4 pt-2 border-b border-gray-200'>
            <h1 className='jacket-page__title text-2xl font-light text-gray-900 mb-2 text-center'>{name}</h1>
            <p className='jacket-page__category text-gray-600 mb-3 text-center'>Мужская куртка</p>
            <p className='jacket-page__price text-xl font-bold text-gray-900 text-center'>{price} ₽</p>
          </div>
        </div>

        <div className='items-center justify-between mb-4 lg:mb-8 lg:flex hidden'>
          <button 
            onClick={handleBack}
            className='back-button group flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 z-20'
          >
            <div className='back-button__icon w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#ffe6b6] group-hover:border-[#ffe6b6] transition-all duration-200'>
              <ArrowLeft size={18} className='group-hover:text-black transition-colors' />
            </div>
            <span className='back-button__text hidden sm:block text-sm font-medium'>Назад</span>
          </button>

          <div className='flex items-center gap-4'>
            <button 
              className='action-button p-3 bg-white rounded-full border border-gray-200 hover:border-[#ffe6b6] transition-all duration-200 cursor-pointer' 
              onClick={() => copyTextToClipboard(`localhost:3000/product/${id}`)}
            >
              <Share2 size={20} className='text-gray-600' />
            </button>
          </div>
        </div>

        <div className='jacket-page__container grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 mb-8 lg:mb-16'>
          <div className='jacket-page__image-section w-full lg:w-[790px]'>
            <div className='jacket-page__image-container bg-white shadow-sm border border-gray-100 lg:border'>

<div className='relative mb-0 lg:mb-4 overflow-hidden bg-gray-50'>
                {selectedColor ? (
                  <img 
                    src={allImages[currentImageIndex]} 
                    alt={`${name} - ${selectedColor?.name || ''} - фото ${currentImageIndex + 1}`}
                    className={cn(
                      'jacket-page__main-image w-full h-full object-cover cursor-zoom-in transition-transform duration-300',
                      isZoomed && 'scale-150 cursor-zoom-out'
                    )}
                    onClick={toggleZoom}
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <EyeOff size={48} className="mx-auto mb-2" />
                      <p>Выберите цвет для просмотра изображений</p>
                    </div>
                  </div>
                )}
                
                {allImages.length > 1 && selectedColor && (
                  <>
                    <button
                      onClick={prevImage}
                      className='absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200'
                    >
                      <ChevronLeft size={16} className='text-gray-700' />
                    </button>
                    <button
                      onClick={nextImage}
                      className='absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200'
                    >
                      <ChevronRight size={16} className='text-gray-700' />
                    </button>
                  </>
                )}
                
                {selectedColor && (
                  <button
                    onClick={toggleZoom}
                    className='absolute bottom-2 lg:bottom-4 right-2 lg:right-4 w-8 h-8 lg:w-10 lg:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200'
                  >
                    <ZoomIn size={16} className='text-gray-700' />
                  </button>
                )}
                
                {allImages.length > 1 && selectedColor && (
                  <div className='absolute bottom-2 lg:bottom-4 left-2 lg:left-4 px-2 py-1 bg-black/70 text-white text-xs lg:text-sm rounded-full'>
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {allImages.length > 1 && selectedColor && (
                <div className='jacket-page__thumbnails flex gap-2 lg:gap-3 overflow-x-auto pb-2 px-2 lg:px-2'>
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={cn(
                        'thumbnail-button flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 z-10',
                        currentImageIndex === index 
                          ? 'border-black shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'
                      )}
                    >
                      <img 
                        src={img} 
                        alt={`${name} - миниатюра ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='jacket-page__info-section w-full lg:max-w-[450px] lg:w-[450px]'>
           
            <div className='bg-white shadow-sm p-4 lg:p-8 border border-gray-100 lg:border h-full justify-between flex flex-col'>
              <div>
              <div className='hidden lg:block jacket-page__header mb-6 pb-6 border-b border-gray-100'>
              <h1 className='jacket-page__title text-3xl font-light text-gray-900 mb-3'>{name}</h1>
              <p className='jacket-page__category text-gray-600 mb-4'>Мужская куртка</p>
              <p className='jacket-page__price text-2xl font-bold text-gray-900'>{price} ₽</p>
            </div>
                <div className='jacket-page__color-section mb-6 flex mx-auto items-center flex-col'>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className='text-gray-600 text-sm lg:text-base'>Доступные расцветки</h3>
                    {colors.length > enabledColors.length && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        {enabledColors.length} из {colors.length}
                      </span>
                    )}
                  </div>
                  
                  <div className='jacket-page__colors-grid flex flex-wrap gap-2 lg:gap-3 mb-4 justify-center'>
                    {colors.map((color) => (
                      <div key={color.id} className="relative">
                        <button
                          onClick={() => handleColorClick(color)}
                          disabled={!color.disabled}
                          className={cn(
                            'jacket-page__color-btn w-16 h-16 lg:w-20 lg:h-20 border-2 transition-all duration-200 flex items-center justify-center rounded-lg overflow-hidden',
                            selectedColor?.id === color.id 
                              ? 'border-black scale-105 shadow-md ring-2 ring-black ring-opacity-20' 
                              : color.disabled
                                ? 'border-gray-300 hover:border-gray-500 hover:scale-105'
                                : 'border-gray-200 opacity-40 cursor-not-allowed',
                            !color.disabled && 'grayscale'
                          )}
                          style={{ 
                            backgroundImage: color.imageUrl ? `url(${color.imageUrl})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                          title={color.disabled ? String(color.name) : `${color.name} - временно недоступен`}
                        >
                          {!color.imageUrl && (
                            <span className={cn(
                              "text-xs font-medium",
                              color.disabled ? "text-gray-800" : "text-gray-400"
                            )}>
                              {color.name}
                            </span>
                          )}
                        </button>
                        {!color.disabled && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                            <EyeOff size={14} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {enabledColors.length === 0 && (
                    <div className="text-center py-4 text-gray-500">

                  <EyeOff size={20} className="mx-auto mb-2" />
                      <p className="text-sm">Нет доступных цветов</p>
                    </div>
                  )}
                  
                  {!selectedColor && enabledColors.length > 0 && (
                    <p className="jacket-page__error-text text-amber-600 text-sm text-center">Пожалуйста, выберите цвет</p>
                  )}
                </div>
                <div className='jacket-page__size-section mb-6 lg:mb-8 flex flex-col items-center'>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className='text-gray-600 text-sm lg:text-base'>Доступные размеры</h3>
                    {sizes.length > enabledSizes.length && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        {enabledSizes.length} из {sizes.length}
                      </span>
                    )}
                  </div>
                  
                  <div className='jacket-page__sizes-grid flex flex-wrap gap-2 lg:gap-3 mb-4 justify-center'>
                    {sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => handleSizeClick(size)}
                        disabled={!size.disabled}
                        className={cn(
                          'jacket-page__size-btn',
                          'border-2 rounded-lg cursor-pointer transition-all duration-200 font-medium flex items-center justify-center w-[70px] lg:w-[90px] h-[35px] lg:h-[40px] py-2 lg:py-3 px-1 lg:px-2 relative',
                          size.disabled
                            ? selectedSize?.id === size.id
                              ? 'border-black bg-black text-white shadow-md'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:shadow-sm'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                        )}
                      >
                        <SizesItem 
                          name={String(size.name)}
                          active={selectedSize?.id === size.id}
                          disabled={!size.disabled}
                        />
                          {!size.disabled && (
                          <div className="absolute -top-1 -right-1">
                            <EyeOff size={10} className="text-gray-400" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {enabledSizes.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <EyeOff size={20} className="mx-auto mb-2" />
                      <p className="text-sm">Нет доступных размеров</p>
                    </div>
                  )}
                  
                  {!selectedSize && enabledSizes.length > 0 && (
                    <p className="jacket-page__error-text text-amber-600 text-sm text-center">Пожалуйста, выберите размер</p>
                  )}
                </div>
              </div>

              <div className='flex flex-col'>
                <button
                  onClick={handleAddToCart}
                  disabled={isAddButtonDisabled || loading || cartLoading || enabledColors.length === 0 || enabledSizes.length === 0}
                  className={cn(
                    'jacket-page__add-btn',
                    'w-full py-3 lg:py-4 px-6 rounded-lg font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wide mb-4 lg:mb-6 text-sm lg:text-base',
                    isAddButtonDisabled || enabledColors.length === 0 || enabledSizes.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800',
                    (loading || cartLoading) && 'opacity-70 cursor-wait'
                  )}
                >
                  {enabledColors.length === 0 || enabledSizes.length === 0 
                    ? 'Товар временно недоступен' 
                    : cartLoading 
                      ? 'Добавляется...' 
                      : 'Добавить в корзину'
                  }
                </button>

                <div className='jacket-page__features grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 text-sm text-gray-600'>
                  <div className='feature-item text-center p-2 lg:p-3 bg-gray-50 rounded-lg'>
                    <div className='font-semibold text-gray-900 text-xs lg:text-sm'>Бесплатная доставка</div>
                    <div className='text-xs'>по всей стране</div>
                  </div>
                  <div className='feature-item text-center p-2 lg:p-3 bg-gray-50 rounded-lg'>
                    <div className='font-semibold text-gray-900 text-xs lg:text-sm'>Возврат</div>
                    <div className='text-xs'>в течение 14 дней</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='jacket-page__details w-full'>
          <div className='bg-white shadow-sm border border-gray-100 overflow-hidden'>
            <div className='jacket-page__tabs flex border-b border-gray-100'>
              <button
                onClick={() => setActiveTab('description')}
                className={cn(
                  'jacket-page__tab flex-1 py-3 lg:py-4 px-4 lg:px-6 text-center font-medium transition-colors duration-200 text-sm lg:text-base',
                  activeTab === 'description' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Описание
              </button>
              <button
                onClick={() => setActiveTab('characteristics')}
                className={cn(
                  'jacket-page__tab flex-1 py-3 lg:py-4 px-4 lg:px-6 text-center font-medium transition-colors duration-200 text-sm lg:text-base',
                  activeTab === 'characteristics' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Характеристики
              </button>
            </div>

            <div className='jacket-page__tab-content p-4 lg:p-8'>
              {activeTab === 'description' && (
                <div className='description-content'>
                  <h3 className='text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4'>О продукте</h3>
                  <p className='text-gray-700 leading-relaxed text-sm lg:text-base'>{descr}</p>
                </div>
              )}

              {activeTab === 'characteristics' && (
                <div className='characteristics-content'>
                  <h3 className='text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6'>Технические характеристики</h3>
                  <div className='grid grid-cols-1 gap-4 lg:gap-6'>
                    <div className='space-y-3 lg:space-y-4'>
                      <div className='characteristic-item flex justify-between'>
                        <span className='font-medium text-gray-900 text-sm lg:text-base'>Материал:</span>
                        <span className='text-gray-700 ml-2 text-sm lg:text-base'>{material || 'Не указано'}</span>

</div>
                      <div className='characteristic-item flex justify-between'>
                        <span className='font-medium text-gray-900 text-sm lg:text-base'>Водонепроницаемость:</span>
                        <span className='text-gray-700 ml-2 text-sm lg:text-base'>{waterproof || 'Не указано'}</span>
                      </div>
                      <div className='characteristic-item flex justify-between'>
                        <span className='font-medium text-gray-900 text-sm lg:text-base'>Утеплитель:</span>
                        <span className='text-gray-700 ml-2 text-sm lg:text-base'>{insulation || 'Не указано'}</span>
                      </div>
                    </div>
                    <div className='space-y-3 lg:space-y-4'>
                      <div className='characteristic-item flex justify-between'>
                        <span className='font-medium text-gray-900 text-sm lg:text-base'>Сезон:</span>
                        <span className='text-gray-700 ml-2 text-sm lg:text-base'>{season || 'Не указано'}</span>
                      </div>
                      <div className='characteristic-item flex justify-between'>
                        <span className='font-medium text-gray-900 text-sm lg:text-base'>Страна производства:</span>
                        <span className='text-gray-700 ml-2 text-sm lg:text-base'>{country || 'Не указано'}</span>
                      </div>
                      <div className='characteristic-item flex justify-between'>
                        <span className='font-medium text-gray-900 text-sm lg:text-base'>Уход:</span>
                        <span className='text-gray-700 ml-2 text-sm lg:text-base'>{care || 'Не указано'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <YouMayAlsoLike jackets={jackets} />
      
      {isZoomed && (
  <div 
    className='fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4 overflow-hidden'
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    onClick={closeZoom}
  >
    <div 
      className='relative max-w-7xl max-h-full z-100'
      onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике на контент
    >
      <button
        onClick={closeZoom}
        className='absolute top-2 lg:top-4 right-2 lg:right-4 z-10 w-8 h-8 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200'
      >
        <X size={20} className='text-white' />
      </button>
      
      {allImages.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className='absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200'
          >
            <ChevronLeft size={20} className='text-white' />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className='absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200'
          >
            <ChevronRight size={20} className='text-white' />
          </button>
          
          <div className='absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 bg-black/70 text-white text-sm lg:text-lg rounded-full'>
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </>
      )}
      
      <img 
        src={allImages[currentImageIndex]} 
        alt={`${name} - ${selectedColor?.name || ''} - увеличенное фото ${currentImageIndex + 1}`}
        className='max-w-full h-[80vh] lg:max-h-[95vh] object-cover cursor-default'
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </div>
)}
    </div>
  );
};