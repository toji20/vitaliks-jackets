'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ModalJacketCard } from './modal-page-card';
import { cn } from '@/lib/utils';
import { Jacket, Category } from '@prisma/client';

import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid3X3,
  List,
  X,
  Search,
  SlidersHorizontal,
  Check,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface CatalogPageProps {
  jackets: Jacket[];
  categories: Category[];
  currentJacketId?: number;
  className?: string;
}

type SortOption = 'default' | 'price' | 'priceReverse' | 'name' | 'nameReverse';

export const CatalogPage: React.FC<CatalogPageProps> = ({ 
  jackets, 
  categories,
  currentJacketId,
  className 
}) => {
  const maxPrice = Math.max(...jackets.map(j => Number(j.price)));
  const minPrice = Math.min(...jackets.map(j => Number(j.price)));
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Jacket[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const searchJackets = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    
    const query = searchQuery.toLowerCase();
    return jackets.filter(jacket =>
      jacket.name.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [jackets, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const results = jackets.filter(jacket => jacket.name.toLowerCase().includes(value.toLowerCase())).slice(0,8)
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleJacketSelect = (jacket: Jacket) => {
    setSearchQuery(jacket.name);
    setShowSearchResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && 
          !searchResultsRef.current.contains(event.target as Node) &&
          searchInputRef.current && 
          !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredAndSortedJackets = useMemo(() => {
    let result = [...jackets];

    if (selectedCategories.length > 0) {
      result = result.filter(jacket =>
        selectedCategories.includes(jacket.categoryId)
      );
    }

    result = result.filter(jacket =>
      Number(jacket.price) >= priceRange[0] && Number(jacket.price) <= priceRange[1]
    );

    switch (sortBy) {
      case 'price':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'priceReverse':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameReverse':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [jackets, sortBy, priceRange, selectedCategories]);

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

const resetFilters = () => {
    setSortBy('default');
    setPriceRange([0, maxPrice]);
    setSearchQuery('');
    setSelectedCategories([]);
    setShowSearchResults(false);
  };

  if (jackets.length === 0) {
    return (
      <section className={cn('catalog-page py-16 bg-stone-50', className)}>
        <div className='w-full mx-auto px-4 text-center'>
          <div className='w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-6'>
            <Search size={32} className='text-gray-400' />
          </div>
          <h2 className='text-2xl font-normal text-gray-900 mb-3'>
            Коллекция пуста
          </h2>
          <p className='text-gray-600 max-w-md mx-auto'>
            В данный момент в коллекции нет доступных курток
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('catalog-page py-8 md:py-16 pt-20 md:pt-26 bg-stone-50 min-h-screen', className)}>
      <div className='w-full mx-auto px-4 sm:px-6 md:px-8'>       
        <div className='flex flex-col lg:flex-row gap-4 mb-6 md:mb-8 items-start lg:items-center'>
        <div className='mb-6 md:mb-8 lg:block hidden'>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className='text-sm font-medium'>На главную</span>
          </Link>
        </div>
          <div className='w-full lg:flex-1 relative max-w-2xl lg:mx-auto lg:mr-[12%] order-2 lg:order-1'>
            <div className='relative'>
              <div className='absolute lg:left-4 left-2 top-1/2 transform -translate-y-1/2 text-gray-400'>
                <Search className='lg:h-8 h-4'/>
              </div>
              <input
                ref={searchInputRef}
                type='text'
                placeholder='Поиск по коллекции...'
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                className='w-full lg:pl-12 lg:pr-4 lg:py-3 pl-10 pr-2 py-2 bg-white border border-gray-300 
                           focus:ring-1 focus:ring-black focus:border-black 
                           transition-all duration-200 text-gray-900 placeholder-gray-500
                           text-sm md:text-base'/>
              
              {showSearchResults && searchResults.length > 0 && (
                <div 
                  ref={searchResultsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 
                            shadow-lg z-50 mt-1 max-h-96 overflow-y-auto"
                >
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-sm text-gray-600 font-medium">
                      Найдено {searchResults.length} курток
                    </p>
                  </div>
                  {searchResults.map((jacket) => (
                    <Link
                      key={jacket.id}
                      href={`/product/${jacket.id}`}
                    >
                      <button
                        onClick={() => handleJacketSelect(jacket)}
                        className="w-full text-left p-3 hover:bg-gray-50 transition-colors 
                                 duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {jacket.imageUrl && (
                            <img 
                              src={jacket.imageUrl}
                              alt={jacket.name}
                              className="w-12 h-12 object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate text-sm">
                              {jacket.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {Number(jacket.price).toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        </div>
                      </button>
                    </Link>
                  ))}
                </div>
              )}

              {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
                <div 
                  ref={searchResultsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 
                            shadow-lg z-50 mt-1 p-4"
                >
                  <p className="text-gray-600 text-center">
                    По запросу "{searchQuery}" ничего не найдено
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='flex items-center gap-3 w-full lg:w-auto justify-between order-1 lg:order-2 mb-0 lg:mb-0'>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 transition-all duration-200 font-medium text-sm',
                showFilters 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <SlidersHorizontal size={18} />
              <span className='hidden sm:inline'>Фильтры</span>
            </button>

            <div className='flex bg-gray-100 p-1'>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-all duration-200',
                  viewMode === 'grid' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                )}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-all duration-200',
                  viewMode === 'list' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                )}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className='flex gap-8'>
          <div className={cn(
            'fixed lg:static inset-0 z-40 lg:z-auto bg-white lg:bg-stone-50 w-full lg:w-80 p-6 pt-20 lg:p-0 space-y-8 transition-all duration-300 transform',
            showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
            'lg:block overflow-y-auto lg:overflow-visible'
          )}>
            <div className='flex justify-between items-center pb-6 border-b border-gray-200 lg:border-none'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Фильтры</h3>
                <p className='text-sm text-gray-500 mt-1'>
                  {filteredAndSortedJackets.length} товаров
                </p>
              </div>
              <div className='flex items-center gap-3'>
                <button
                  onClick={resetFilters}
                  className='text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium'

>
                  Сбросить
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className='lg:hidden text-gray-400 hover:text-gray-600 p-1'
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide'>
                Категории
              </h4>
              <div className='space-y-2 max-h-60 overflow-y-auto'>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={cn(
                      'w-full text-left px-3 py-3 transition-all duration-200 flex items-center gap-3 text-sm group',
                      selectedCategories.includes(category.id)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 border flex items-center justify-center transition-all duration-200',
                      selectedCategories.includes(category.id)
                        ? 'bg-black border-black text-white'
                        : 'border-gray-300 group-hover:border-gray-400'
                    )}>
                      {selectedCategories.includes(category.id) && (
                        <Check size={12} />
                      )}
                    </div>
                    {category.name}
                    <span className='text-gray-400 text-xs ml-auto'>
                      ({jackets.filter(j => j.categoryId === category.id).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide'>
                Сортировка
              </h4>
              <div className='space-y-1'>
                {[
                  { value: 'default', label: 'По умолчанию' },
                  { value: 'price', label: 'Цена: по возрастанию', icon: SortAsc },
                  { value: 'priceReverse', label: 'Цена: по убыванию', icon: SortDesc },
                  { value: 'name', label: 'Название: А-Я', icon: SortAsc },
                  { value: 'nameReverse', label: 'Название: Я-А', icon: SortDesc },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSortBy(value as SortOption)}
                    className={cn(
                      'w-full text-left px-3 py-3 transition-all duration-200 flex items-center gap-3 text-sm',
                      sortBy === value 
                        ? 'bg-gray-100 text-gray-900 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {Icon && <Icon size={16} />}
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide'>
                Цена
              </h4>
              <div className='space-y-4'>
                <div className='py-2'>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange([Number(e.target.value), priceRange[1]])}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black mt-2"
                  />
                </div>
                
                <div className='flex gap-3'>
                  <div className='flex-1'>
                    <label className='text-xs text-gray-600 mb-1 block font-medium'>ОТ</label>
                    <input
                      type='number'
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange([Number(e.target.value), priceRange[1]])}
                      className='w-full px-3 py-2 bg-white border border-gray-300 text-sm
                                 focus:ring-1 focus:ring-black focus:border-black 
                                 transition-all duration-200'
                    />
                  </div>
                  <div className='flex-1'>
                    <label className='text-xs text-gray-600 mb-1 block font-medium'>ДО</label>
                    <input
                      type='number'
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange([priceRange[0], Number(e.target.value)])}
                      className='w-full px-3 py-2 bg-white border border-gray-300 text-sm
                                 focus:ring-1 focus:ring-black focus:border-black 
                                 transition-all duration-200'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1 w-full'>
            <div className='flex justify-between items-center mb-6 lg:block hidden'>
              <div className='text-gray-600 text-sm'>
                Показано: <span className='font-semibold text-gray-900'>{filteredAndSortedJackets.length}</span> товаров
              </div>
            </div>
            
            <div className={cn(
              'grid gap-4 md:gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            )}>
              {filteredAndSortedJackets.map((jacket) => (
                <ModalJacketCard
                  key={jacket.id}
                  jacket={jacket}
                  className={cn(
                    'group bg-white border border-gray-200 overflow-hidden',
                    'hover:shadow-lg transition-all duration-300',
                    viewMode === 'list' && 'flex items-stretch'
                  )}
                />
              ))}
            </div>

            {filteredAndSortedJackets.length === 0 && (
              <div className='text-center py-20 bg-stone-50'>
                <div className='w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4'>
                  <Search size={24} className='text-gray-400' />
                </div>
                <h3 className='text-xl font-normal text-gray-900 mb-2'>
                  Ничего не найдено
                  </h3>
                <p className='text-gray-600 mb-6 max-w-md mx-auto text-sm'>
                  Попробуйте изменить параметры фильтров
                </p>
                <button
                  onClick={resetFilters}
                  className='px-6 py-3 bg-black text-white text-sm hover:bg-gray-800 
                           transition-all duration-200 font-medium'
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={() => setShowFilters(false)}
        />
      )}
    </section>
  );
};