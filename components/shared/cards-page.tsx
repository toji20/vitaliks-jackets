'use client'

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
  id?: string;
}

export const Catalog: React.FC<React.PropsWithChildren<Props>> = ({ className, id }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const images = [
    '/new-jacket-1.png',
    '/new-jacket-2.png',
    '/new-jacket-3.png',
  ];

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImageIndex) return;
    setIsTransitioning(true);
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && !isHovered && !isMobile) {
        nextImage();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning, isHovered, isMobile]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentImageIndex]);

  const getImageIndex = (offset: number) => {
    const index = currentImageIndex + offset;
    if (index < 0) return images.length + index;
    if (index >= images.length) return index - images.length;
    return index;
  };

  if (isMobile) {
    return (
      <div 
        className={cn('bg-stone-50 px-4 py-8 relative overflow-hidden', className)} 
        id={id}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200/80" />
        
        <div className="relative z-10 mx-auto max-w-9xl">
          <div className='flex flex-col justify-between items-center mb-8'>
            <h2 className='text-3xl font-light text-stone-800 mb-4 text-center'>
              НОВИНКИ
            </h2>
            
            <Link 
              href="/catalog"
              className="group flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-all duration-300 border-b border-transparent hover:border-stone-700 pb-1"
            >
              <span className='text-base font-light tracking-wide'>Смотреть все</span> 
              <ArrowRight 
                size={16} 
                className='transition-transform duration-300 group-hover:translate-x-1' 
              />
            </Link>
          </div>   
          
          <div className="relative mb-12">
            <div className="overflow-hidden shadow-xl mx-auto max-w-sm">
              <img 
                src={images[currentImageIndex]} 
                alt="Текущая новинка" 
                className='w-full h-100 object-cover'
              />
              <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">

              NEW
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 px-4">
              <button 
                onClick={prevImage}
                disabled={isTransitioning}
                className={cn(
                  "p-3 rounded-full bg-white/80 border border-stone-300/50 transition-all duration-300",
                  isTransitioning && "opacity-50"
                )}
                aria-label="Предыдущее изображение"
              >
                <ArrowLeft size={20} className="text-stone-700" />
              </button>
              
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    disabled={isTransitioning}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      index === currentImageIndex 
                        ? 'bg-amber-500 scale-125' 
                        : 'bg-stone-300'
                    )}
                    aria-label={`Перейти к изображению ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextImage}
                disabled={isTransitioning}
                className={cn(
                  "p-3 rounded-full bg-white/80 border border-stone-300/50 transition-all duration-300",
                  isTransitioning && "opacity-50"
                )}
                aria-label="Следующее изображение"
              >
                <ArrowRight size={20} className="text-stone-700" />
              </button>
            </div>
          </div>

          <div className="text-center px-4">
            <p className="text-stone-600 text-base leading-relaxed">
              Откройте для себя последние новинки нашей коллекции — инновационные материалы, 
              современный дизайн и непревзойденный комфорт
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div 
        className={cn('bg-stone-50 px-6 py-16 relative overflow-hidden', className)} 
        id={id}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200/80" />
        
        <div className="relative z-10 mx-auto max-w-9xl">
          <div className='flex flex-col md:flex-row justify-between items-center mb-20'>
            <h2 className='text-4xl font-light text-stone-800 mb-6 md:mb-0 text-center md:text-left'>
              НОВИНКИ
            </h2>
            
            <Link 
              href="/catalog"
              className="group flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-all duration-300 border-b border-transparent hover:border-stone-700 pb-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className='text-lg font-light tracking-wide'>Смотреть все</span> 
              <ArrowRight 
                size={18} 
                className='transition-transform duration-300 group-hover:translate-x-1' 
              />
            </Link>
          </div>   
          
          <div 
            className='flex items-center justify-center py-6 gap-4'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button 
              onClick={prevImage}
              disabled={isTransitioning}
              className={cn(
                "p-3 rounded-full backdrop-blur-sm border border-stone-300/50 hover:border-stone-400/70 transition-all duration-300 group",

"bg-white/30 hover:bg-white/50",
                isTransitioning && "opacity-50"
              )}
              aria-label="Предыдущее изображение"
            >
              <ArrowLeft 
                size={20} 
                className="text-stone-700 group-hover:text-stone-900 transition-colors" 
              />
            </button>
            
            <div className='flex gap-4 items-center relative h-80 w-full mb-12'>
              <div className={cn(
                "absolute left-4 transition-all duration-500 ease-out transform cursor-pointer w-1/3",
                isTransitioning ? "opacity-60 scale-95 -translate-x-2" : "opacity-70 scale-95",
                "hover:opacity-90 hover:scale-100"
              )}>
                <div className='overflow-hidden shadow-lg rounded-xl'>
                  <img 
                    src={images[getImageIndex(-1)]} 
                    alt="Предыдущая куртка" 
                    className='w-full h-64 object-cover transition-transform duration-500 hover:scale-105'
                    onClick={prevImage}
                  />
                </div>
              </div>
              
              <div className={cn(
                "absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out z-10 w-2/5",
                isTransitioning ? "scale-100 opacity-100" : "scale-105 opacity-100",
                "hover:scale-110"
              )}>
                <div className='overflow-hidden shadow-2xl '>
                  <img 
                    src={images[currentImageIndex]} 
                    alt="Текущая новинка" 
                    className='w-full h-72 object-cover transition-transform duration-500'
                  />
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  NEW
                </div>
              </div>
              
              <div className={cn(
                "absolute right-4 transition-all duration-500 ease-out transform cursor-pointer w-1/3",
                isTransitioning ? "opacity-60 scale-95 translate-x-2" : "opacity-70 scale-95",
                "hover:opacity-90 hover:scale-100"
              )}>
                <div className='overflow-hidden shadow-lg rounded-xl'>
                  <img 
                    src={images[getImageIndex(1)]} 
                    alt="Следующая куртка" 
                    className='w-full h-64 object-cover transition-transform duration-500 hover:scale-105'
                    onClick={nextImage}
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={nextImage}
              disabled={isTransitioning}
              className={cn(
                "p-3 rounded-full backdrop-blur-sm border border-stone-300/50 hover:border-stone-400/70 transition-all duration-300 group",
                "bg-white/30 hover:bg-white/50",
                isTransitioning && "opacity-50"
              )}
              aria-label="Следующее изображение"
            >
              <ArrowRight 
                size={20} 
                className="text-stone-700 group-hover:text-stone-900 transition-colors" 
              />
            </button>
          </div>
          
          <div className="flex justify-center gap-3 mt-16">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                disabled={isTransitioning}
                className={cn(

'w-3 h-3 rounded-full transition-all duration-500 backdrop-blur-sm border border-stone-300/50',
                  index === currentImageIndex 
                    ? 'bg-amber-500 scale-125 border-amber-600/50' 
                    : 'bg-stone-300/70 hover:bg-stone-400/80',
                  isTransitioning && ""
                )}
                aria-label={`Перейти к изображению ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-12 px-6">
            <p className="text-stone-600 text-base max-w-2xl mx-auto leading-relaxed">
              Откройте для себя последние новинки нашей коллекции — инновационные материалы, 
              современный дизайн и непревзойденный комфорт в каждом сезоне
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn('bg-stone-50 md:px-8 px-5 md:py-20 py-16 relative overflow-hidden', className)} 
      id={id}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200/80" />
      
      <div className="relative z-10 mx-auto max-w-9xl">
        <div className='flex flex-col md:flex-row justify-between items-center px-22 mb-26'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-6 md:mb-0 text-center md:text-left'>
            НОВИНКИ
          </h2>
          
          <Link 
            href="/catalog"
            className="group flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-all duration-300 border-b border-transparent hover:border-stone-700 pb-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className='text-lg font-light tracking-wide'>Смотреть все</span> 
            <ArrowRight 
              size={18} 
              className='transition-transform duration-300 group-hover:translate-x-1' 
            />
          </Link>
        </div>   
        <div 
          className='flex items-center justify-center py-8 gap-6 md:gap-8'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button 
            onClick={prevImage}
            disabled={isTransitioning}
            className={cn(
              "p-3 rounded-full backdrop-blur-sm border border-stone-300/50 hover:border-stone-400/70 transition-all duration-300 group",
              "bg-white/30 hover:bg-white/50",
              isTransitioning && "opacity-50 "
            )}
            aria-label="Предыдущее изображение"
          >
            <ArrowLeft 
              size={24} 
              className="text-stone-700 group-hover:text-stone-900 transition-colors" 
            />
          </button>
          <div className='flex gap-6 items-center relative h-96 w-full mb-16'>
            <div className={cn(
              "absolute left-0 transition-all duration-500 ease-out transform cursor-pointer",
              isTransitioning ? "opacity-60 scale-95 -translate-x-4" : "opacity-70 scale-95",
              "hover:opacity-90 hover:scale-100"
            )}>
              <div className='overflow-hidden shadow-lg'>
                <img 
                  src={images[getImageIndex(-1)]} 
                  alt="Предыдущая куртка" 
                  className='object-cover transition-transform duration-500 hover:scale-105'
                  onClick={prevImage}
                />
              </div>
            </div>
            <div className={cn(
              "absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out z-10",
              isTransitioning ? "scale-100 opacity-100" : "scale-105 opacity-100",

"hover:scale-110"
            )}>
              <div className='overflow-hidden shadow-2xl'>
                <img 
                  src={images[currentImageIndex]} 
                  alt="Текущая новинка" 
                  className='object-cover transition-transform duration-500'
                />
              </div>
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                NEW
              </div>
            </div>
            <div className={cn(
              "absolute right-0 transition-all duration-500 ease-out transform cursor-pointer",
              isTransitioning ? "opacity-60 scale-95 translate-x-4" : "opacity-70 scale-95",
              "hover:opacity-90 hover:scale-100"
            )}>
              <div className='overflow-hidden shadow-lg'>
                <img 
                  src={images[getImageIndex(1)]} 
                  alt="Следующая куртка" 
                  className='object-cover transition-transform duration-500 hover:scale-105'
                  onClick={nextImage}
                />
              </div>
            </div>
          </div>
          <button 
            onClick={nextImage}
            disabled={isTransitioning}
            className={cn(
              "p-3 rounded-full backdrop-blur-sm border border-stone-300/50 hover:border-stone-400/70 transition-all duration-300 group",
              "bg-white/30 hover:bg-white/50",
              isTransitioning && "opacity-50 "
            )}
            aria-label="Следующее изображение"
          >
            <ArrowRight 
              size={24} 
              className="text-stone-700 group-hover:text-stone-900 transition-colors" 
            />
          </button>
        </div>
        <div className="flex justify-center gap-3 mt-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-500 backdrop-blur-sm border border-stone-300/50',
                index === currentImageIndex 
                  ? 'bg-amber-500 scale-125 border-amber-600/50' 
                  : 'bg-stone-300/70 hover:bg-stone-400/80',
                isTransitioning && ""
              )}
              aria-label={`Перейти к изображению ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-16 px-6">
          <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Откройте для себя последние новинки нашей коллекции — инновационные материалы, 
            современный дизайн и непревзойденный комфорт в каждом сезоне
          </p>
        </div>
      </div>
    </div>
  );
};