import { UserRole, OrderStatus } from '@prisma/client';

export const mockUsers = [
  {
    id: 1,
    fullName: 'Администратор Системы',
    email: 'admin@example.com',
    password: '$2b$10$ExampleHashedPassword1234567890',
    role: UserRole.ADMIN,
    verified: new Date(),
    provider: null,
    providerId: null,
  },
  {
    id: 2,
    fullName: 'Иван Петров',
    email: 'ivan@example.com',
    password: '$2b$10$ExampleHashedPassword1234567890',
    role: UserRole.USER,
    verified: new Date(),
    provider: null,
    providerId: null,
  },
  {
    id: 3,
    fullName: 'Мария Сидорова',
    email: 'maria@example.com',
    password: '$2b$10$ExampleHashedPassword1234567890',
    role: UserRole.USER,
    verified: new Date(),
    provider: 'google',
    providerId: 'google_123456',
  },
];

export const mockCategories = [
  {
    id: 1,
    name: 'Кожаные куртки',
    imageUrl: '/images/categories/leather.jpg',
  },
  {
    id: 2,
    name: 'Джинсовые куртки',
    imageUrl: '/images/categories/denim.jpg',
  },
  {
    id: 3,
    name: 'Зимние куртки',
    imageUrl: '/images/categories/winter.jpg',
  },
  {
    id: 4,
    name: 'Спортивные куртки',
    imageUrl: '/images/categories/sports.jpg',
  },
];

export const mockJackets = [
  {
    id: 1,
    name: 'Кожаная куртка "Classic"',
    imageUrl: '/images/jackets/leather-classic.jpg',
    disabled: false,
    price: 12000,
    descr: 'Премиальная кожаная куртка классического кроя',
    categoryId: 1,
    material: 'Не указано',
    lining: 'Не указано',
    insulation: 'Есть',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    id: 2,
    name: 'Кожаная куртка "Biker"',
    imageUrl: '/images/jackets/leather-biker.jpg',
    disabled: false,
    price: 15000,
    descr: 'Стильная косуха для смелых образов',
    categoryId: 1,
    material: 'Не указано',
    lining: 'Не указано',
    insulation: 'Не указано',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Не указано'
  },
  {
    id: 3,
    name: 'Джинсовая куртка "Vintage"',
    imageUrl: '/images/jackets/denim-vintage.jpg',
    disabled: false,
    price: 5000,
    descr: 'Винтажная джинсовая куртка с эффектом поношенности',
    categoryId: 2,
    material: 'Не указано',
    lining: 'есть',
    insulation: 'Не указано',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Мыть'
  },
  {
    id: 4,
    name: 'Зимняя куртка "Arctic"',
    imageUrl: '/images/jackets/winter-arctic.jpg',
    disabled: false,
    price: 20000,
    descr: 'Теплая зимняя куртка для суровых морозов',
    categoryId: 3,
    material: 'есть',
    lining: 'Не указано',
    insulation: 'есть',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Не указано'
  },
  {
    id: 5,
    name: 'Спортивная куртка "Runner"',
    imageUrl: '/images/jackets/sports-runner.jpg',
    disabled: false,
    price: 8000,
    descr: 'Легкая спортивная куртка для активного отдыха',
    categoryId: 4,
    material: 'Не указано',
    lining: 'Не указано',
    insulation: 'Не указано',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Не указано'
  },
];

export const mockJacketItems = [
 {jacketItemId: 1, price:12000},
 {jacketItemId: 2, price:15000},
 {jacketItemId: 3, price:5000},
 {jacketItemId: 4, price:20000},
 {jacketItemId: 4, price:8000},
];

export const mockSizes = [
  {
    id: 1,
    name: 'XS',
    price: null, 
    imageUrl: '', 
    jacketId: 1,
  },
  {
    id: 2,
    name: 'S',
    price: null,
    imageUrl: '',
    jacketId: 1,
  },
  {
    id: 3,
    name: 'M',
    price: null,
    imageUrl: '',
    jacketId: 1,
  },
  {
    id: 4,
    name: 'L',
    price: null,
    imageUrl: '',
    jacketId: 1,
  },
  {
    id: 5,
    name: 'XL',
    price: null,
    imageUrl: '',
    jacketId: 1,
  },
  {
    id: 6,
    name: 'S',
    price: null,
    imageUrl: '',
    jacketId: 2,
  },
  {
    id: 7,
    name: 'M',
    price: null,
    imageUrl: '',
    jacketId: 2,
  },
  {
    id: 8,
    name: 'L',
    price: null,
    imageUrl: '',
    jacketId: 2,
  },
  {
    id: 9,
    name: 'XL',
    price: null,
    imageUrl: '',
    jacketId: 2,
  },
  {
    id: 10,
    name: 'M',
    price: null,
    imageUrl: '',
    jacketId: 3,
  },
  {
    id: 11,
    name: 'L',
    price: null,
    imageUrl: '',
    jacketId: 3,
  },
  {
    id: 12,
    name: 'XL',
    price: null,
    imageUrl: '',
    jacketId: 3,
  },
  {
    id: 13,
    name: 'L',
    price: null,
    imageUrl: '',
    jacketId: 4,
  },
  {
    id: 14,
    name: 'XL',
    price: null,
    imageUrl: '',
    jacketId: 4,
  },
  {
    id: 15,
    name: 'XXL',
    price: null,
    imageUrl: '',
    jacketId: 4,
  },
  {
    id: 16,
    name: 'S',
    price: null,
    imageUrl: '',
    jacketId: 5,
  },
  {
    id: 17,
    name: 'M',
    price: null,
    imageUrl: '',
    jacketId: 5,
  },
  {
    id: 18,
    name: 'L',
    price: null,
    imageUrl: '',
    jacketId: 5,
  },
];

export const mockCarts = [
  {
    id: 1,
    userId: 2, 
    token: 'cart_token_ivan_123',
    totalAmount: 17000,
  },
  {
    id: 2,
    userId: null, 
    token: 'cart_token_guest_456',
    totalAmount: 5000,
  },
  {
    id: 3,
    userId: 3, 
    token: 'cart_token_maria_789',
    totalAmount: 28000,
  },
];

export const mockCartItems = [
  {
    id: 1,
    cartId: 1,
    jacketItemId: 4,
    quantity: 1,
  },
  {
    id: 2,
    cartId: 1,
    jacketItemId: 7,
    quantity: 1,
  },
  {
    id: 3,
    cartId: 2,
    jacketItemId: 7,
    quantity: 1,
  },
  {
    id: 4,
    cartId: 3,
    jacketItemId: 10,
    quantity: 1,
  },
  {
    id: 5,
    cartId: 3,
    jacketItemId: 13,
    quantity: 1,
  },
];

export const mockCartItemSizes = [
  {
    cartItemId: 1,
    sizeId: 6, 
  },
  {
    cartItemId: 2,
    sizeId: 10, 
  },
  {
    cartItemId: 3,
    sizeId: 11, 
  },
  {
    cartItemId: 4,
    sizeId: 13, 
  },
  {
    cartItemId: 5,
    sizeId: 16, 
  },
];

export const mockOrders = [
  {
    id: 1,
    userId: 2,
    token: 'order_token_123',
    totalAmount: 17000,
    status: OrderStatus.SUCCEEDED,
    paymentId: 'pay_123456789',
    items: [
      {
        jacketItemId: 4,
        jacketName: 'Кожаная куртка "Biker" - Черная',
        quantity: 1,
        price: 15000,
        size: 'S'
      },
      {
        jacketItemId: 7,
        jacketName: 'Джинсовая куртка "Vintage" - Синяя',
        quantity: 1,
        price: 5000,
        size: 'M'
      }
    ],
    fullName: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Примерная, д. 123, кв. 45',
    comment: 'Позвонить за час до доставки',
  },
  {
    id: 2,
    userId: null,
    token: 'order_token_456',
    totalAmount: 5000,
    status: OrderStatus.PENDING,
    paymentId: null,
    items: [
      {
        jacketItemId: 7,
        jacketName: 'Джинсовая куртка "Vintage" - Синяя',
        quantity: 1,
        price: 5000,
        size: 'L'
      }
    ],
    fullName: 'Анонимный Покупатель',
    email: 'guest@example.com',
    phone: '+7 (999) 987-65-43',
    address: 'г. Санкт-Петербург, ул. Тестовая, д. 456',
    comment: null,
  },
  {
    id: 3,
    userId: 3,
    token: 'order_token_789',
    totalAmount: 28000,
    status: OrderStatus.SUCCEEDED,
    paymentId: 'pay_987654321',
    items: [
      {
        jacketItemId: 10,
        jacketName: 'Зимняя куртка "Arctic" - Черная',
        quantity: 1,
        price: 20000,
        size: 'L'
      },
      {
        jacketItemId: 13,
        jacketName: 'Спортивная куртка "Runner" - Черная',
        quantity: 1,
        price: 8000,
        size: 'S'
      }
    ],
    fullName: 'Мария Сидорова',
    email: 'maria@example.com',
    phone: '+7 (999) 555-44-33',
    address: 'г. Казань, ул. Центральная, д. 78',
    comment: 'Доставить после 18:00',
  },
];


export const contactsPageTexts = [
  {
    key: 'contacts_title',
    content: 'Контакты',
    category: 'hero'
  },
  {
    key: 'contacts_subtitle',
    content: 'МЫ ВСЕГДА НА СВЯЗИ',
    category: 'hero'
  },
  {
    key: 'back_button',
    content: 'На главную',
    category: 'navigation'
  },
  {
    key: 'contact_info_title',
    content: 'СВЯЖИТЕСЬ С НАМИ',
    category: 'contacts'
  },
  {
    key: 'contact_address_title',
    content: 'АДРЕС',
    category: 'contacts'
  },
  {
    key: 'contact_address_line1',
    content: 'г. Москва, ул. Примерная, 123',
    category: 'contacts'
  },
  {
    key: 'contact_address_line2',
    content: 'Бизнес-центр "Стиль", 5 этаж',
    category: 'contacts'
  },
  {
    key: 'contact_phone_title',
    content: 'ТЕЛЕФОНЫ',
    category: 'contacts'
  },
  {
    key: 'contact_phone_1',
    content: '+7 (495) 123-45-67',
    category: 'contacts'
  },
  {
    key: 'contact_phone_2',
    content: '+7 (999) 123-45-67',
    category: 'contacts'
  },
  {
    key: 'contact_email_title',
    content: 'EMAIL',
    category: 'contacts'
  },
  {
    key: 'contact_email_1',
    content: 'info@jacketstore.ru',
    category: 'contacts'
  },
  {
    key: 'contact_email_2',
    content: 'order@jacketstore.ru',
    category: 'contacts'
  },
  {
    key: 'contact_hours_title',
    content: 'РЕЖИМ РАБОТЫ',
    category: 'contacts'
  },
  {
    key: 'contact_hours_weekdays',
    content: 'Пн-Пт: 10:00 - 20:00',
    category: 'contacts'
  },
  {
    key: 'contact_hours_weekends',
    content: 'Сб-Вс: 11:00 - 19:00',
    category: 'contacts'
  },
  {
    key: 'social_title',
    content: 'МЫ В СОЦСЕТЯХ',
    category: 'social'
  },
  {
    key: 'social_instagram_name',
    content: 'Instagram',
    category: 'social'
  },
  {
    key: 'social_instagram_url',
    content: 'https://instagram.com/jacketstore',
    category: 'social'
  },
  {
    key: 'social_telegram_name',
    content: 'Telegram',
    category: 'social'
  },
  {
    key: 'social_telegram_url',
    content: 'https://t.me/jacketstore',
    category: 'social'
  },
  {
    key: 'map_title',
    content: 'КАК НАС НАЙТИ',
    category: 'map'
  },
  {
    key: 'faq_title',
    content: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
    category: 'faq'
  },
  {
    key: 'faq_question_1',
    content: 'Как добраться до магазина?',
    category: 'faq'
  },
  {
    key: 'faq_answer_1',
    content: 'Мы находимся в центре Москвы, рядом со станцией метро "Примерная". От метро 5 минут пешком.',
    category: 'faq'
  },
  {
    key: 'faq_question_2',
    content: 'Есть ли парковка?',
    category: 'faq'
  },
  {
    key: 'faq_answer_2',
    content: 'Да, рядом с бизнес-центром есть подземная парковка. Первые 2 часа бесплатно для наших клиентов.',
    category: 'faq'
  },
  {
    key: 'faq_question_3',
    content: 'Можно ли примерить куртки?',
    category: 'faq'
  },
  {
    key: 'faq_answer_3',
    content: 'Конечно! У нас есть просторная примерочная зона. Приходите и выбирайте свой идеальный размер.',
    category: 'faq'
  },
  {
    key: 'cta_title',
    content: 'ГОТОВЫ СДЕЛАТЬ ЗАКАЗ?',
    category: 'cta'
  },
  {
    key: 'cta_description',
    content: 'Посетите наш магазин лично или свяжитесь с нами по телефону. Мы поможем подобрать идеальную куртку именно для вас.',
    category: 'cta'
  },
  {
    key: 'cta_button_phone',
    content: 'ПОЗВОНИТЬ СЕЙЧАС',
    category: 'cta'
  },
  {
    key: 'cta_button_catalog',
    content: 'ПЕРЕЙТИ В КАТАЛОГ',
    category: 'cta'
  }
]

export const infoPageTexts = [
  {
    key: 'info_page_title',
    content: 'Информация | Магазин мужских курток',
    category: 'meta'
  },
  {
    key: 'info_page_description',
    content: 'Вся информация о магазине, доставке, возврате и качестве',
    category: 'meta'
  },
  
  {
    key: 'header_logo',
    content: 'JACKET STORE',
    category: 'navigation'
  },
  {
    key: 'nav_catalog',
    content: 'Каталог',
    category: 'navigation'
  },
  {
    key: 'nav_info',
    content: 'Информация',
    category: 'navigation'
  },
  {
    key: 'nav_contacts',
    content: 'Контакты',
    category: 'navigation'
  },
  
  {
    key: 'info_hero_title',
    content: 'Вся информация',
    category: 'hero'
  },
  {
    key: 'info_hero_subtitle',
    content: 'Узнайте больше о нашем магазине, условиях доставки, возврата и качестве материалов',
    category: 'hero'
  },
  
  {
    key: 'info_about_title',
    content: 'О нас',
    category: 'about'
  },
  {
    key: 'info_about_content',
    content: `Мы — современный магазин мужских курток, созданный для тех, кто ценит качество, стиль и функциональность. Наша миссия — предлагать лучшие модели курток, которые сочетают в себе последние тренды мировой моды и проверенное качество материалов.
    Каждая куртка в нашем ассортименте проходит тщательный отбор, чтобы соответствовать высоким стандартам комфорта и долговечности. Мы работаем только с проверенными производителями и брендами, которые разделяют наши ценности.`,
    category: 'about'
  },
  
  {
    key: 'info_delivery_title',
    content: 'Доставка',
    category: 'delivery'
  },
  {
    key: 'info_delivery_russia_title',
    content: 'По России',
    category: 'delivery'
  },
  {
    key: 'info_delivery_russia_1',
    content: 'Курьерская доставка: 1-3 рабочих дня — 490 ₽',
    category: 'delivery'
  },
  {
    key: 'info_delivery_russia_2',
    content: 'Почта России: 5-14 рабочих дней — 290 ₽',
    category: 'delivery'
  },
  {
    key: 'info_delivery_russia_3',
    content: 'Экспресс-доставка: 1-2 рабочих дня — 790 ₽',
    category: 'delivery'
  },
  {
    key: 'info_delivery_moscow_title',
    content: 'По Москве',
    category: 'delivery'
  },
  {
    key: 'info_delivery_moscow_1',
    content: 'Курьером: бесплатно при заказе от 10 000 ₽',
    category: 'delivery'
  },
  {
    key: 'info_delivery_moscow_2',
    content: 'Самовывоз: 25 пунктов выдачи по городу',
    category: 'delivery'
  },
  {
    key: 'info_delivery_note',
    content: 'Все заказы оформленные до 18:00 доставляются в тот же день. Вы можете отслеживать статус доставки в личном кабинете.',
    category: 'delivery'
  },
  
  {
    key: 'info_returns_title',
    content: 'Возврат и обмен',
    category: 'returns'
  },
  {
    key: 'info_returns_conditions_title',
    content: 'Условия возврата',
    category: 'returns'
  },
  {
    key: 'info_returns_conditions_1',
    content: 'Возврат в течение 14 дней с момента получения заказа',
    category: 'returns'
  },
  {
    key: 'info_returns_conditions_2',
    content: 'Товар должен сохранить товарный вид и бирки',
    category: 'returns'
  },
  {
    key: 'info_returns_conditions_3',
    content: 'Возвращаем полную стоимость за вычетом стоимости доставки',
    category: 'returns'
  },
  {
    key: 'info_returns_process_title',
    content: 'Как оформить возврат',
    category: 'returns'
  },
  {
    key: 'info_returns_process_1',
    content: 'Напишите нам на почту returns@jacketstore.ru',
    category: 'returns'
  },
  {
    key: 'info_returns_process_2',
    content: 'Укажите номер заказа и причину возврата',
    category: 'returns'
  },
  {
    key: 'info_returns_process_3',
    content: 'Мы вышлем инструкцию по отправке',
    category: 'returns'
  },
  {
    key: 'info_returns_note',
    content: 'Обмен производится в течение 30 дней на аналогичный товар другого размера или модели.',
    category: 'returns'
  },
  
  {
    key: 'info_quality_title',
    content: 'Качество материалов',
    category: 'quality'
  },
  {
    key: 'info_quality_materials_title',
    content: 'Наружные материалы',
    category: 'quality'
  },
  {
    key: 'info_quality_materials_1',
    content: 'Мембранные ткани — водонепроницаемость от 10 000 мм',
    category: 'quality'
  },
  {
    key: 'info_quality_materials_2',
    content: 'Натуральная кожа — выделка высшего качества',
    category: 'quality'
  },
  {
    key: 'info_quality_materials_3',
    content: 'Плотный хлопок — 400+ г/м² для долговечности',
    category: 'quality'
  },
  {
    key: 'info_quality_insulation_title',
    content: 'Утеплители',
    category: 'quality'
  },
  {
    key: 'info_quality_insulation_1',
    content: 'Натуральный пух — 90% пуха, 10% пера',
    category: 'quality'
  },
  {
    key: 'info_quality_insulation_2',
    content: 'Синтетические утеплители — сохраняют тепло даже при намокании',
    category: 'quality'
  },
  {
    key: 'info_quality_insulation_3',
    content: 'Флис — быстросохнущий и дышащий',
    category: 'quality'

},
  {
    key: 'info_quality_note',
    content: 'Все материалы проходят проверку на соответствие экологическим стандартам.',
    category: 'quality'
  },
  
  {
    key: 'info_sizing_title',
    content: 'Размеры и примерка',
    category: 'sizing'
  },
  {
    key: 'info_sizing_content',
    content: `## Как выбрать размер
Измерьте обхват груди, талии и бедер, затем сравните с таблицей размеров для каждой модели. Учитывайте, что куртки могут сидеть по-разному в зависимости от кроя и материала.

## Виртуальная примерка
Используйте нашу технологию виртуальной примерки:
1. Загрузите свое фото
2. Выберите понравившуюся куртку
3. Увидите как она будет сидеть на вас

Если сомневаетесь в размере — закажите несколько вариантов, возврат лишнего бесплатный.`,
    category: 'sizing'
  },
  
  {
    key: 'info_care_title',
    content: 'Уход за куртками',
    category: 'care'
  },
  {
    key: 'info_care_general_title',
    content: 'Общие рекомендации',
    category: 'care'
  },
  {
    key: 'info_care_general_1',
    content: 'Следуйте инструкциям на бирке изделия',
    category: 'care'
  },
  {
    key: 'info_care_general_2',
    content: 'Используйте специализированные средства для чистки',
    category: 'care'
  },
  {
    key: 'info_care_general_3',
    content: 'Храните в расправленном виде в проветриваемом шкафу',
    category: 'care'
  },
  {
    key: 'info_care_leather_title',
    content: 'Кожаные куртки',
    category: 'care'
  },
  {
    key: 'info_care_leather_1',
    content: 'Чистка только у профессиональных клинеров',
    category: 'care'
  },
  {
    key: 'info_care_leather_2',
    content: 'Использование кондиционеров для кожи',
    category: 'care'
  },
  {
    key: 'info_care_leather_3',
    content: 'Защита от прямых солнечных лучей',
    category: 'care'
  },
  {
    key: 'info_care_down_title',
    content: 'Пуховые куртки',
    category: 'care'
  },
  {
    key: 'info_care_down_1',
    content: 'Стирка в деликатном режиме со специальными средствами',
    category: 'care'
  },
  {
    key: 'info_care_down_2',
    content: 'Сушка с теннисными мячиками для расправления пуха',
    category: 'care'
  },
  {
    key: 'info_care_down_3',
    content: 'Хранение в расправленном виде',
    category: 'care'
  },
  
  {
    key: 'info_cta_title',
    content: 'Остались вопросы?',
    category: 'cta'
  },
  {
    key: 'info_cta_description',
    content: 'Наша команда поддержки всегда готова помочь вам с выбором и ответить на любые вопросы',
    category: 'cta'
  },
  {
    key: 'info_cta_button_contact',
    content: 'Написать нам',
    category: 'cta'
  },
  {
    key: 'info_cta_button_phone',
    content: '8 (800) 123-45-67',
    category: 'cta'
  }
];

export const footerTexts = [
  {
    key: 'footer_description',
    content: 'Качественные куртки на любой сезон. Современный дизайн, премиальные материалы и доступные цены.',
    category: 'footer'
  },
  {
    key: 'footer_navigation_title',
    content: 'Навигация',
    category: 'footer'
  },
  {
    key: 'footer_nav_catalog',
    content: 'Каталог',
    category: 'footer'
  },
  {
    key: 'footer_nav_winter',
    content: 'Зимние куртки',
    category: 'footer'
  },
  {
    key: 'footer_nav_spring',
    content: 'Весенние куртки',
    category: 'footer'
  },
  {
    key: 'footer_nav_autumn',
    content: 'Осенние куртки',
    category: 'footer'
  },
  {
    key: 'footer_nav_contacts',
    content: 'Контакты',
    category: 'footer'
  },
  {
    key: 'footer_nav_info',
    content: 'Информация для покупателя',
    category: 'footer'
  },
  {
    key: 'footer_contacts_title',
    content: 'Контакты',
    category: 'footer'
  },
  {
    key: 'footer_phone',
    content: '+7 (800) 123-45-67',
    category: 'footer'
  },
  {
    key: 'footer_email',
    content: 'info@jacketstore.ru',
    category: 'footer'
  },
  {
    key: 'footer_address',
    content: 'г. Москва, ул. Примерная, д. 123',
    category: 'footer'
  },
  {
    key: 'footer_hours_title',
    content: 'Время работы',
    category: 'footer'
  },
  {
    key: 'footer_hours_weekdays',
    content: 'Пн-Пт: 9:00 - 21:00',
    category: 'footer'
  },
  {
    key: 'footer_hours_weekends',
    content: 'Сб-Вс: 10:00 - 20:00',
    category: 'footer'
  },
  {
    key: 'footer_copyright',
    content: 'Все права защищены.',
    category: 'footer'
  },
  {
    key: 'social_twitter_url',
    content: 'https://twitter.com/jacketstore',
    category: 'social'
  }
]