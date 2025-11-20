// seed.ts
import { UserRole } from '@prisma/client';
import { prisma } from './prisma-client';
import { contactsPageTexts, infoPageTexts } from './constant/constant';
import { hashSync } from 'bcrypt';

// Константы с данными для сидинга
const users = [
  {
    fullName: 'Test User',
    email: 'test@example.com',
    password: '$2a$10$X8z5JZ7qQ7q5Q7q5Q7q5Qe', // хэшированный пароль
    role: UserRole.USER,
  }
];

const categories = [
  {
    name: 'NIKE',
    imageUrl: '/images/nike.jpg'
  },
  {
    name: 'PUMA',
    imageUrl: '/images/puma.jpg'
  },
  {
    name: 'ADIDAS',
    imageUrl: '/images/adidas.jpg'
  },
  {
    name: 'NEW BALANCE',
    imageUrl: '/images/new-balance.jpg'
  }
];

const jackets = [
  {
    name: 'Nike Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    price: 12000,
    descr: 'Комфортная куртка от Nike',
    categoryId: 1,
    material: 'Не указано',
    waterproof: 'дилдаз',
    insulation: 'Есть',
    season: 'Не указано',
    country: 'Весенняя',
    care: 'Не мыть'
  },
  {
    name: 'Puma Jacket 2',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-2_1104x1104.webp',
    price: 20000,
    descr: 'Стильная куртка от Puma',
    categoryId: 2,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Летняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Adidas Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a4qyx92a-1_1104x1104.webp',
    price: 11000,
    descr: 'Теплая куртка от Adidas',
    categoryId: 3,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Зимняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'New Balance Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-2_1104x1104.webp',
    price: 9500,
    descr: 'Удобная куртка от New Balance',
    categoryId: 4,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Осенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },  {
    name: 'Nike Jacket 2',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    price: 12000,
    descr: 'Комфортная куртка от Nike',
    categoryId: 1,
    material: 'Не указано',
    waterproof: 'дилдаз',
    insulation: 'Есть',
    season: 'Зимняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Puma Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-2_1104x1104.webp',
    price: 10000,
    descr: 'Стильная куртка от Puma',
    categoryId: 2,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Летняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Adidas Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a4qyx92a-1_1104x1104.webp',
    price: 11000,
    descr: 'Теплая куртка от Adidas',
    categoryId: 3,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Летняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'New Balance Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-2_1104x1104.webp',
    price: 9500,
    descr: 'Удобная куртка от New Balance',
    categoryId: 4,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Зимняя',
    country: 'Не указано',
    care: 'Не мыть'
  },  {
    name: 'Nike Jacket 3',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    price: 12000,
    descr: 'Комфортная куртка от Nike',
    categoryId: 1,
    material: 'Не указано',
    waterproof: 'дилдаз',
    insulation: 'Есть',
    season: 'Летняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Puma Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-2_1104x1104.webp',
    price: 10000,
    descr: 'Стильная куртка от Puma',
    categoryId: 2,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Осенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Adidas Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a4qyx92a-1_1104x1104.webp',
    price: 11000,
    descr: 'Теплая куртка от Adidas',
    categoryId: 3,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Весенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'New Balance Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-2_1104x1104.webp',
    price: 9500,
    descr: 'Удобная куртка от New Balance',
    categoryId: 4,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Весенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },  {
    name: 'Nike Jacket 4',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    price: 12000,
    descr: 'Комфортная куртка от Nike',
    categoryId: 1,
    material: 'Не указано',
    waterproof: 'дилдаз',
    insulation: 'Есть',
    season: 'Осенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Puma Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-2_1104x1104.webp',
    price: 10000,
    descr: 'Стильная куртка от Puma',
    categoryId: 2,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Весенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Adidas Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a4qyx92a-1_1104x1104.webp',
    price: 11000,
    descr: 'Теплая куртка от Adidas',
    categoryId: 3,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Зимняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'New Balance Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-2_1104x1104.webp',
    price: 9500,
    descr: 'Удобная куртка от New Balance',
    categoryId: 4,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Осенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },  {
    name: 'Nike Jacket 5',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    price: 12000,
    descr: 'Комфортная куртка от Nike',
    categoryId: 1,
    material: 'Не указано',
    waterproof: 'дилдаз',
    insulation: 'Есть',
    season: 'Летняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Puma Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-2_1104x1104.webp',
    price: 10000,
    descr: 'Стильная куртка от Puma',
    categoryId: 2,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Весенняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Adidas Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a4qyx92a-1_1104x1104.webp',
    price: 11000,
    descr: 'Теплая куртка от Adidas',
    categoryId: 3,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Летняя',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'New Balance Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-2_1104x1104.webp',
    price: 9500,
    descr: 'Удобная куртка от New Balance',
    categoryId: 4,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'шкшибиди',
    country: 'Не указано',
    care: 'Не мыть'
  },  {
    name: 'Nike Jacket 6',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    price: 12000,
    descr: 'Комфортная куртка от Nike',
    categoryId: 1,
    material: 'Не указано',
    waterproof: 'дилдаз',
    insulation: 'Есть',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Puma Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-2_1104x1104.webp',
    price: 10000,
    descr: 'Стильная куртка от Puma',
    categoryId: 2,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'Не указано',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'Adidas Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a4qyx92a-1_1104x1104.webp',
    price: 11000,
    descr: 'Теплая куртка от Adidas',
    categoryId: 3,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'джарахов',
    country: 'Не указано',
    care: 'Не мыть'
  },
  {
    name: 'New Balance Jacket 1',
    imageUrl: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-1_1104x1104.webp',
    imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a3c8ddco-2_1104x1104.webp',
    price: 9500,
    descr: 'Удобная куртка от New Balance',
    categoryId: 4,
    material: 'Не указано',
    waterproof: 'Не указано',
    insulation: 'Есть',
    season: 'шкшибиди',
    country: 'Не указано',
    care: 'Не мыть'
  },
];

const sizes = [
  { name: 'S', jacketId: 1 },
  { name: 'M', jacketId: 1 },
  { name: 'L', jacketId: 1 },
  { name: 'XL', jacketId: 2 },
  { name: 'S', jacketId: 2 },
  { name: 'M', jacketId: 3 },
  { name: 'L', jacketId: 4 },
  { name: 'S', jacketId: 5 },
  { name: 'M', jacketId: 6 },
  { name: 'L', jacketId: 7 },
  { name: 'XL', jacketId:8 },
  { name: 'S', jacketId: 9 },
  { name: 'M', jacketId: 10 },
  { name: 'L', jacketId: 11 },
  //
  { name: 'S', jacketId: 12 },
  { name: 'M', jacketId: 13 },
  { name: 'L', jacketId: 14 },
  { name: 'XL', jacketId: 15 },
  { name: 'S', jacketId: 16 },
  { name: 'M', jacketId: 17 },
  { name: 'L', jacketId: 18 },
  { name: 'S', jacketId: 19 },
  { name: 'M', jacketId:20 },
  { name: 'L', jacketId: 21 },
  { name: 'XL', jacketId: 22 },
  { name: 'S', jacketId: 23 },
  { name: 'M', jacketId: 24 },
  { name: 'L', jacketId: 11 },
];

export const colors = [
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:2,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
   imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
   imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
   name: 'красная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:2,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'зеленая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:2,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'желтая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:1,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'красная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-0_1104x1104.webp',
   jacketId:1,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a832jgoe-0_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'желтая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a89gt39m-0_1104x1104.webp',
   jacketId:1,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a89gt39m-7_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'желтая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:3,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'красная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:3,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'желтая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:3,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'синняя',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:4,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:4,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'красная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:4,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'зеленая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:5,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:5,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'белая',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:5,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:6,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:7,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:7,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:7,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:8,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:8,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:9,
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:9,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:9,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:10,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:10,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:11,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:12,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:12,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:13,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:14,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:14,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:15,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  },
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:16,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:17,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:17,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:18,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:18,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:18,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:19,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:19,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:19,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:20,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:20,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:20,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
//adkmcamdk
{ 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:21,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:21,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:21,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:22,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:23,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:23,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
  { 
   imageUrl:'https://img.brandshop.ru/cache/products/n/nf0a5gjf8k2-0_1104x1104.webp',
   jacketId:23,
   
   imageUrlTwo: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-0_1104x1104.webp',
    imageUrlThree: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-2_1104x1104.webp',
    imageUrlFour: 'https://img.brandshop.ru/cache/products/n/nf0a5gjfbri-4_1104x1104.webp',
    name: 'черная',
  }, 
]

const jacketItems = [
  {
    price: 12000,
    jacketId: 1,
    categoryId: 1
  },
  {
    price: 10000,
    jacketId: 2,
    categoryId: 2
  },
  {
    price: 11000,
    jacketId: 3,
    categoryId: 3
  },
  {
    price: 9500,
    jacketId: 4,
    categoryId: 4
  },{
    price: 12000,
    jacketId: 5,
    categoryId: 1
  },
  {
    price: 10000,
    jacketId: 6,
    categoryId: 2
  },
  {
    price: 11000,
    jacketId: 7,
    categoryId: 3
  },
  {
    price: 9500,
    jacketId: 8,
    categoryId: 4
  },{
    price: 12000,
    jacketId: 9,
    categoryId: 1
  },
  {
    price: 10000,
    jacketId: 10,
    categoryId: 2
  },
  {
    price: 11000,
    jacketId: 11,
    categoryId: 3
  },
  {
    price: 9500,
    jacketId: 12,
    categoryId: 4
  },{
    price: 12000,
    jacketId: 13,
    categoryId: 1
  },
  {
    price: 10000,
    jacketId: 14,
    categoryId: 2
  },
  {
    price: 11000,
    jacketId: 15,
    categoryId: 3
  },
  {
    price: 9500,
    jacketId: 16,
    categoryId: 4
  },{
    price: 12000,
    jacketId: 17,
    categoryId: 1
  },
  {
    price: 10000,
    jacketId: 18,
    categoryId: 2
  },
  {
    price: 11000,
    jacketId: 19,
    categoryId: 3
  },
  {
    price: 9500,
    jacketId: 20,
    categoryId: 4
  },{
    price: 12000,
    jacketId: 21,
    categoryId: 1
  },
  {
    price: 10000,
    jacketId: 22,
    categoryId: 2
  },
  {
    price: 11000,
    jacketId: 23,
    categoryId: 3
  },
  {
    price: 9500,
    jacketId: 24,
    categoryId: 4
  },
];

const carts = [
  {
    userId: 1,
    totalAmount: 24000,
    token: 'cart_token_12345',
  }
];

const cartItems = [
  {
    jacketItemId: 1,
    cartId: 1,
    quantity: 2,
  }
];

async function main() {
  // Очистка данных в правильном порядке
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "JacketItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Size" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Jacket" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "TextContent" RESTART IDENTITY CASCADE`;
await prisma.user.createMany({
    data: [
    {
        fullName: "admin mrallince",
        email: String(process.env.ADMIN_EMAIL),
        password: hashSync(String(process.env.ADMIN_PASSWORD), 10),
        verified: new Date(),
        role: "ADMIN"
    }]
});
  await prisma.textContent.createMany({
    data: contactsPageTexts,
  })

  await prisma.textContent.createMany({
    data: infoPageTexts,
  })

  // Создаем категории
  await prisma.category.createMany({
    data: categories,
  });

  // Создаем куртки
  await prisma.jacket.createMany({
    data: jackets,
  });

  // Создаем размеры
  await prisma.size.createMany({
    data: sizes,
  });

  // Создаем элементы курток
  await prisma.jacketItem.createMany({
    data: jacketItems,
  });

  await prisma.color.createMany({
    data: colors
  })

  // Создаем корзины
  await prisma.cart.createMany({
    data: carts,
  });

  // Создаем элементы корзины с подключением размеров
  for (const cartItem of cartItems) {
    const createdCartItem = await prisma.cartItem.create({
      data: {
        jacketItemId: cartItem.jacketItemId,
        cartId: cartItem.cartId,
        quantity: cartItem.quantity,
      },
    });

    // Подключаем размеры к элементу корзины
    await prisma.cartItem.update({
      where: { id: createdCartItem.id },
      data: {
        sizes: {
          connect: [{ id: 1 }, { id: 2 }], // Подключаем размеры S и M
        },
      },
    });
  }
  console.log('Сидинг завершен успешно!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });