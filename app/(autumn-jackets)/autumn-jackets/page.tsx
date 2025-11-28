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
  const autumnJackets = jackets.filter(jacket => jacket.season?.includes('Осенняя') || jacket.season?.includes('Осень') || jacket.season?.includes('Осенние'))
  return (
    <div className="">
      <Suspense>
        <CatalogPage
        categories={categories}
        jackets={autumnJackets}
        />
      </Suspense>
    </div>
  );
}
