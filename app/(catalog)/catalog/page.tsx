import { CatalogPage } from "@/components/shared/catalog-page";
import { Filters } from "@/components/shared/filters";
import { YouMayAlsoLike } from "@/components/shared/modal-page-cards-list";
import { filterPrice, GetSearchParams } from "@/lib/find-pizzas";
import { prisma } from "@/prisma/prisma-client";
export const dynamic = 'force-dynamic';

export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<GetSearchParams> 
}) {
  const jackets = await prisma.jacket.findMany({

  })
const categories = await prisma.category.findMany({})
  return (
    <div className="">
        <CatalogPage
          jackets={jackets}
          categories={categories}
        />
    </div>
  );
}