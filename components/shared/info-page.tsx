'use client'
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TextContent {
  id: string
  key: string
  content: string
}

const InfoPage = () => {
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

  const sections = [
    {
      id: 'about',
      title: getText('info_about_title', 'О нас'),
      icon: '🏢',
      content: getText('info_about_content',` Мы — современный магазин мужских курток, созданный для тех, кто ценит качество, стиль и функциональность. Наша миссия — предлагать лучшие модели курток, которые сочетают в себе последние тренды мировой моды и проверенное качество материалов.

        Каждая куртка в нашем ассортименте проходит тщательный отбор, чтобы соответствовать высоким стандартам комфорта и долговечности. Мы работаем только с проверенными производителями и брендами, которые разделяют наши ценности.`)
    },
    {
      id: 'delivery',
      title: getText('info_delivery_title', 'Доставка'),
      icon: '🚚',
      features: [
        {
          title: getText('info_delivery_russia_title', 'По России'),
          items: [
            getText('info_delivery_russia_1', 'Курьерская доставка: 1-3 рабочих дня — 490 ₽'),
            getText('info_delivery_russia_2', 'Почта России: 5-14 рабочих дней — 290 ₽'),
            getText('info_delivery_russia_3', 'Экспресс-доставка: 1-2 рабочих дня — 790 ₽')
          ]
        },
        {
          title: getText('info_delivery_moscow_title', 'По Москве'),
          items: [
            getText('info_delivery_moscow_1', 'Курьером: бесплатно при заказе от 10 000 ₽'),
            getText('info_delivery_moscow_2', 'Самовывоз: 25 пунктов выдачи по городу')
          ]
        }
      ],
      note: getText('info_delivery_note', 'Все заказы оформленные до 18:00 доставляются в тот же день. Вы можете отслеживать статус доставки в личном кабинете.')
    },
    {
      id: 'returns',
      title: getText('info_returns_title', 'Возврат и обмен'),
      icon: '🔄',
      features: [
        {
          title: getText('info_returns_conditions_title', 'Условия возврата'),
          items: [
            getText('info_returns_conditions_1', 'Возврат в течение 14 дней с момента получения заказа'),
            getText('info_returns_conditions_2', 'Товар должен сохранить товарный вид и бирки'),
            getText('info_returns_conditions_3', 'Возвращаем полную стоимость за вычетом стоимости доставки')
          ]
        },
        {
          title: getText('info_returns_process_title', 'Как оформить возврат'),
          items: [
            getText('info_returns_process_1', 'Напишите нам на почту returns@jacketstore.ru'),

getText('info_returns_process_2', 'Укажите номер заказа и причину возврата'),
            getText('info_returns_process_3', 'Мы вышлем инструкцию по отправке')
          ]
        }
      ],
      note: getText('info_returns_note', 'Обмен производится в течение 30 дней на аналогичный товар другого размера или модели.')
    },
    {
      id: 'quality',
      title: getText('info_quality_title', 'Качество материалов'),
      icon: '⭐️',
      features: [
        {
          title: getText('info_quality_materials_title', 'Наружные материалы'),
          items: [
            getText('info_quality_materials_1', 'Мембранные ткани — водонепроницаемость от 10 000 мм'),
            getText('info_quality_materials_2', 'Натуральная кожа — выделка высшего качества'),
            getText('info_quality_materials_3', 'Плотный хлопок — 400+ г/м² для долговечности')
          ]
        },
        {
          title: getText('info_quality_insulation_title', 'Утеплители'),
          items: [
            getText('info_quality_insulation_1', 'Натуральный пух — 90% пуха, 10% пера'),
            getText('info_quality_insulation_2', 'Синтетические утеплители — сохраняют тепло даже при намокании'),
            getText('info_quality_insulation_3', 'Флис — быстросохнущий и дышащий')
          ]
        }
      ],
      note: getText('info_quality_note', 'Все материалы проходят проверку на соответствие экологическим стандартам.')
    },
    {
      id: 'sizing',
      title: getText('info_sizing_title', 'Размеры и примерка'),
      icon: '📏',
      content: getText('info_sizing_content', `## Как выбрать размер
Измерьте обхват груди, талии и бедер, затем сравните с таблицей размеров для каждой модели. Учитывайте, что куртки могут сидеть по-разному в зависимости от кроя и материала.

## Виртуальная примерка
Используйте нашу технологию виртуальной примерки:
1. Загрузите свое фото
2. Выберите понравившуюся куртку
3. Увидите как она будет сидеть на вас

Если сомневаетесь в размере — закажите несколько вариантов, возврат лишнего бесплатный.`)
    },
    {
      id: 'care',
      title: getText('info_care_title', 'Уход за куртками'),
      icon: '👕',
      features: [
        {
          title: getText('info_care_general_title', 'Общие рекомендации'),
          items: [
            getText('info_care_general_1', 'Следуйте инструкциям на бирке изделия'),
            getText('info_care_general_2', 'Используйте специализированные средства для чистки'),
            getText('info_care_general_3', 'Храните в расправленном виде в проветриваемом шкафу')
          ]
        },
        {
          title: getText('info_care_leather_title', 'Кожаные куртки'),
          items: [
            getText('info_care_leather_1', 'Чистка только у профессиональных клинеров'),
            getText('info_care_leather_2', 'Использование кондиционеров для кожи'),
            getText('info_care_leather_3', 'Защита от прямых солнечных лучей')
          ]
        },
        {
          title: getText('info_care_down_title', 'Пуховые куртки'),
          items: [
            getText('info_care_down_1', 'Стирка в деликатном режиме со специальными средствами'),
            getText('info_care_down_2', 'Сушка с теннисными мячиками для расправления пуха'),
            getText('info_care_down_3', 'Хранение в расправленном виде')
          ]
        }
      ]
    }
  ];

  const renderContent = (section: any) => {
    if (section.content) {
      return (
        <div className="max-w-none text-gray-700 leading-relaxed">
          {section.content.split('\n').map((paragraph: string, index: number) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="text-lg font-semibold text-black mt-6 mb-4 first:mt-0">
                  {paragraph.replace('## ', '')}

</h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
              return (
                <div key={index} className="flex items-start mb-2">
                  <span className="text-black font-medium min-w-6">{paragraph.split('.')[0]}.</span>
                  <span className="text-gray-700">{paragraph.split('. ').slice(1).join('. ')}</span>
                </div>
              );
            }
            if (paragraph.trim() === '') {
              return <br key={index} />;
            }
            return (
              <p key={index} className="mb-4 last:mb-0 text-gray-700">
                {paragraph}
              </p>
            );
          })}
        </div>
      );
    }

    if (section.features) {
      return (
        <div className="space-y-6">
          <div className="space-y-6">
            {section.features.map((feature: any, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-black mb-3 text-lg">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="text-gray-700 flex items-start">
                      <span className="text-black mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {section.note && (
            <div className="bg-gray-50 border-l-4 border-gray-300 pl-4 py-3">
              <p className="text-gray-700 italic">{section.note}</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{getText('info_page_title', 'Информация | Магазин мужских курток')}</title>
        <meta name="description" content={getText('info_page_description', 'Вся информация о магазине, доставке, возврате и качестве')} />
      </Head>

      <div className="min-h-screen bg-white flex flex-col mt-15">
        <main className="flex-grow py-12">
          <div className="container px-8 max-w-none">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-black mb-4">
                {getText('info_hero_title', 'Вся информация')}
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {getText('info_hero_subtitle', 'Узнайте больше о нашем магазине, условиях доставки, возврата и качестве материалов')}
              </p>
            </div>

            <div className="space-y-16">
              {sections.map((section, index) => (

<section 
                  key={section.id}
                  className="scroll-mt-8"
                >
                  <div className="flex items-start mb-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                      <span className="text-xl">{section.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-2">
                        {section.title}
                      </h2>
                      <div className="w-12 h-0.5 bg-black"></div>
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    {renderContent(section)}
                  </div>

                  {index < sections.length - 1 && (
                    <div className="mt-12 pt-8 border-t border-gray-100"></div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-20 text-center">
              <div className="bg-gray-50 border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  {getText('info_cta_title', 'Остались вопросы?')}
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {getText('info_cta_description', 'Наша команда поддержки всегда готова помочь вам с выбором и ответить на любые вопросы')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contacts"
                    className="bg-black text-white px-8 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors duration-200 border border-black inline-block"
                  >
                    {getText('info_cta_button_contact', 'Написать нам')}
                  </Link>
                  <a 
                    href="tel:+78001234567"
                    className="bg-white text-black px-8 py-3 rounded-none font-medium hover:bg-gray-50 transition-colors duration-200 border border-gray-300 inline-block"
                  >
                    {getText('info_cta_button_phone', '8 (800) 123-45-67')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default InfoPage;