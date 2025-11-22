'use client'

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Send, 
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface TextContent {
  id: string
  key: string
  content: string
}

export default function ContactsPage() {
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTexts = async () => {
      try {
        const response = await fetch('/api/texts')
        const data: TextContent[] = await response.json()
        
        const textsMap = data.reduce((acc, text) => {
          acc[text.key] = text.content
          return acc
        }, {} as Record<string, string>)
        
        setTexts(textsMap)
      } catch (error) {
        console.error('Ошибка загрузки текстов:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTexts()
  }, [])

  const getText = (key: string, fallback: string = '') => {
    return texts[key] || fallback
  }

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      title: getText('contact_address_title', 'АДРЕС'),
      details: [
        getText('contact_address_line1', 'г. Москва, ул. Примерная, 123'),
        getText('contact_address_line2', 'Бизнес-центр "Стиль", 5 этаж')
      ],
      link: 'https://yandex.ru/maps/-/CDV~IIA0'
    },
    {
      icon: <Phone size={20} />,
      title: getText('contact_phone_title', 'ТЕЛЕФОНЫ'),
      details: [
        getText('contact_phone_1', '+7 (495) 123-45-67'),
        getText('contact_phone_2', '+7 (999) 123-45-67')
      ],
      link: 'tel:+74951234567'
    },
    {
      icon: <Mail size={20} />,
      title: getText('contact_email_title', 'EMAIL'),
      details: [
        getText('contact_email_1', 'info@jacketstore.ru'),
        getText('contact_email_2', 'order@jacketstore.ru')
      ],
      link: 'mailto:info@jacketstore.ru'
    },
    {
      icon: <Clock size={20} />,
      title: getText('contact_hours_title', 'РЕЖИМ РАБОТЫ'),
      details: [
        getText('contact_hours_weekdays', 'Пн-Пт: 10:00 - 20:00'),
        getText('contact_hours_weekends', 'Сб-Вс: 11:00 - 19:00')
      ],
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      name: getText('social_instagram_name', 'Instagram'),
      href: getText('social_instagram_url', 'https://instagram.com/jacketstore'),
      color: 'hover:text-pink-500'
    },
    {
      icon: <Send size={20} />,
      name: getText('social_telegram_name', 'Telegram'),
      href: getText('social_telegram_url', 'https://t.me/jacketstore'),
      color: 'hover:text-blue-500'
    },
  ];

  const faqItems = [
    {
      question: getText('faq_question_1', 'Как добраться до магазина?'),
      answer: getText('faq_answer_1', 'Мы находимся в центре Москвы, рядом со станцией метро "Примерная". От метро 5 минут пешком.')
    },
    {
      question: getText('faq_question_2', 'Есть ли парковка?'),
      answer: getText('faq_answer_2', 'Да, рядом с бизнес-центром есть подземная парковка. Первые 2 часа бесплатно для наших клиентов.')
    },
    {
      question: getText('faq_question_3', 'Можно ли примерить куртки?'),
      answer: getText('faq_answer_3', 'Конечно! У нас есть просторная примерочная зона. Приходите и выбирайте свой идеальный размер.')
    }
  ];

  return (
    <section className='catalog-page bg-stone-50 min-h-screen pt-14 sm:pt-14 lg:pt-18'>
      <div className='bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
        <div className='flex items-center justify-between max-w-7xl mx-auto w-full'>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group flex-shrink-0"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200 sm:size-5" />
            <span className='text-xs sm:text-sm font-medium hidden xs:inline'>
              {getText('back_button', 'На главную')}
            </span>
          </Link>

          <div className='text-center flex-1 px-2'>
            <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-1 sm:mb-2'>
              {getText('contacts_title', 'Контакты')}
            </h1>
            <p className='text-gray-500 text-xs sm:text-sm'>
              {getText('contacts_subtitle', 'МЫ ВСЕГДА НА СВЯЗИ')}
            </p>
          </div>

          <div className='w-6 sm:w-8 lg:w-24 flex-shrink-0'></div>
        </div>
      </div>

      <div className='w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='border-r-0 lg:border-r border-gray-200'>
            <div className='bg-white border-b border-gray-200 p-4 sm:p-6'>
              <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6'>
                {getText('contact_info_title', 'СВЯЖИТЕСЬ С НАМИ')}
              </h2>
              
              <div className='space-y-0 sm:space-y-4'>
                {contactInfo.map((contact, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      'flex items-start gap-3 sm:gap-4 p-3 sm:p-4 transition-colors duration-200 group',
                      'border-b border-gray-100 last:border-b-0',
                      'sm:border-0 sm:rounded-lg sm:hover:bg-gray-50'
                    )}
                  >
                    <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-black group-hover:text-white transition-all duration-200 flex-shrink-0'>
                      {contact.icon}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 mb-1 text-xs sm:text-sm'>{contact.title}</h3>
                      {contact.details.map((detail, idx) => (
                        <div key={idx} className='mb-1 last:mb-0'>
                          {contact.link ? (
                            <a 
                              href={contact.link}
                              className='text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs sm:text-sm break-words'
                            >
                              {detail}
                            </a>
                          ) : (
                            <p className='text-gray-600 text-xs sm:text-sm break-words'>{detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-white border-b border-gray-200 p-4 sm:p-6 lg:border-b-0'>
              <h3 className='font-semibold text-gray-900 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide'>
                {getText('social_title', 'МЫ В СОЦСЕТЯХ')}
              </h3>
              <div className='flex gap-2 sm:gap-3'>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      'w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-200 hover:bg-gray-200',
                      social.color
                    )}
                    aria-label={social.name}
                  >
                    {React.cloneElement(social.icon, { size: 16 })}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className='bg-white border-b border-gray-200 p-4 sm:p-6'>
              <h3 className='font-semibold text-gray-900 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide'>
                {getText('map_title', 'КАК НАС НАЙТИ')}
              </h3>
              <div className='w-full h-48 sm:h-64 lg:h-80 bg-gray-100 rounded-lg overflow-hidden'>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2251.0337129956797!2d37.83064307687522!3d55.65362257304761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab6f25a8fc615%3A0x4002efd7d787ef83!2z0KDRi9C90L7QuiDQodCw0LTQvtCy0L7QtA!5e0!3m2!1sru!2sru!4v1762888451354!5m2!1sru!2sru"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className='rounded-lg'
                />
              </div>
            </div>

            <div className='bg-white p-4 sm:p-6'>
              <h3 className='font-semibold text-gray-900 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide'>
                {getText('faq_title', 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ')}
              </h3>
              <div className='space-y-0 sm:space-y-4'>
                {faqItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      'pb-3 sm:pb-4 border-b border-gray-100 last:border-b-0 last:pb-0',
                      'sm:border-0'
                    )}
                  >
                    <h4 className='font-medium text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm'>{item.question}</h4>
                    <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
          <div className='max-w-7xl mx-auto text-center'>
            <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3'>
              {getText('cta_title', 'ГОТОВЫ СДЕЛАТЬ ЗАКАЗ?')}
            </h2>
            <p className='text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto'>
              {getText('cta_description', 'Посетите наш магазин лично или свяжитесь с нами по телефону. Мы поможем подобрать идеальную куртку именно для вас.')}
            </p>
            <div className='flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center'>
              <a 
                href='tel:+74951234567'
                className='bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 text-xs sm:text-sm flex-1 xs:flex-none text-center'
              >
                {getText('cta_button_phone', 'ПОЗВОНИТЬ СЕЙЧАС')}
              </a>
              <Link 
                href='/catalog'
                className='bg-transparent border border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-200 text-xs sm:text-sm flex-1 xs:flex-none text-center'
              >
                {getText('cta_button_catalog', 'ПЕРЕЙТИ В КАТАЛОГ')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}