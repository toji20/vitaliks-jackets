import { Bg } from "@/components/shared/bg";
import { Catalog } from "@/components/shared/cards-page";
import { Header } from "@/components/shared/header";
import { MainCards } from "@/components/shared/main-cards";
import { NavBg } from "@/components/shared/nav-bg";
import { VitalikBanner } from "@/components/shared/vitalik-banner";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      jackets: {
        include: {
          sizes: true,
          colors: true
        }
      }
    }
  })

  return (
    <div className="">
      <Suspense>
      <Bg title="VITALIK'S JACKETS" url="" btnText="ЗАКАЗАТЬ"/>
      <VitalikBanner/>
      <NavBg/>
      <Catalog
      />
      </Suspense>
    </div>
  );
}
