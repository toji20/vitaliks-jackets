import { Bg } from "@/components/shared/bg";
import { Catalog } from "@/components/shared/cards-page";
import { CatalogPage } from "@/components/shared/catalog-page";
import { Header } from "@/components/shared/header";
import { NavBg } from "@/components/shared/nav-bg";
import { VitalikBanner } from "@/components/shared/vitalik-banner";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await prisma.category.findMany({
  })
  const jackets = await prisma.jacket.findMany({

  })
  const winterJackets = jackets.filter(jacket => jacket.season?.includes('Зимняя') || jacket.season?.includes('Зима') || jacket.season?.includes('Зимние'))
  return (
    <div className="">
      <Suspense>
        <CatalogPage
        categories={categories}
        jackets={winterJackets}
        />
      </Suspense>
    </div>
  );
}
