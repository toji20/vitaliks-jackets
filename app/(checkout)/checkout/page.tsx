// app/checkout/page.tsx
'use client'
import { Cart } from '@/components/shared/cart';
import { Form } from '@/components/shared/form-components/form';
import React, { useState } from 'react';
import { checkoutFormSchema, CheckoutFormValues } from '@/components/shared/form-components/checkout-form-schema';
import { useCart } from '@/hooks/use-cart';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrder } from '@/app/api/actions/actions';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const { items, loading, totalAmount } = useCart();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='catalog-page bg-white min-h-screen'>
      <FormProvider {...form}>
        {/* Мобильный хедер */}
        <div className='lg:hidden bg-white border-b border-gray-200 px-4 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group flex-shrink-0"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span className='text-xs font-medium md:block hidden'>На главную</span>
            </Link>

            <div className='text-center flex-1 px-2'>
              <h1 className='text-xl font-semibold text-gray-900 mb-1'>Оформление заказа</h1>
              <p className='text-gray-500 text-xs'>БЕЗОПАСНАЯ ОПЛАТА</p>
            </div>

            <Link 
              href="/contacts"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group flex-shrink-0"
            >
              <MapPin size={16} />
              <span className='text-xs font-medium md:block hidden'>Контакты</span>
            </Link>
          </div>
        </div>

        {/* Десктопный хедер */}
        <div className='hidden lg:block w-full mx-auto px-8 pt-11'>
          <div className='flex items-center justify-between mb-16'>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span className='text-sm font-medium'>На главную</span>
            </Link>

            <div className='text-center flex-1'>
              <h1 className='text-3xl font-semibold text-gray-900 mb-2'>Оформление заказа</h1>
              <p className='text-gray-500 text-sm'>БЕЗОПАСНАЯ ОПЛАТА</p>
            </div>

            <Link 
              href="/contacts"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <MapPin size={18} />
              <span className='text-sm font-medium'>Контакты</span>
            </Link>
          </div>
        </div>
        
        {/* Основной контент */}
        <div className='w-full pb-10'>
          {/* Мобильная версия */}
          <div className='lg:hidden'>
            <div className='grid grid-cols-1'>
              {/* Корзина */}
              <div className='border-b border-gray-200'>
                <div className='bg-white p-4'>
                  <Cart
                    totalAmount={totalAmount}
                    items={items}
                    loading={loading}
                  />
                </div>
              </div>
              
              {/* Форма */}
              <div className='bg-white'>
                <div className='p-4'>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='h-full'>
                    <Form
                      totalAmount={totalAmount}
                      loading={loading || submitting}
                      submitting={submitting}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Десктопная версия */}
          <div className='hidden lg:block w-full mx-auto px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
              <div>
                <Cart
                  totalAmount={totalAmount}
                  items={items}
                  loading={loading}
                />
              </div>
              
              <div>
                <form onSubmit={form.handleSubmit(onSubmit)} className='h-full'>
                  <Form
                    totalAmount={totalAmount}
                    loading={loading || submitting}
                    submitting={submitting}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </section>
  );
}