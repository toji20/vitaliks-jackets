import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 15000;

export const filterPrice = async (params: GetSearchParams) => {
  const minPrice = parseFloat(params.priceFrom || '') || DEFAULT_MIN_PRICE;
  const maxPrice = parseFloat(params.priceTo || '') || DEFAULT_MAX_PRICE;

  const finalMinPrice = Math.min(minPrice, maxPrice);
  const finalMaxPrice = Math.max(minPrice, maxPrice);

  const categories = await prisma.category.findMany({
    include: {
      jackets: {
        orderBy: {
          id: 'desc',
        },
        where: {
          price: {
            gte: finalMinPrice,
            lte: finalMaxPrice,
          },
        },
        include: {
          colors: true,
          sizes: true,
          items: {
            where: {
              price: {
                gte: finalMinPrice,
                lte: finalMaxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};