import {  JacketPage } from "@/components/shared/jacket-form";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
    params
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params  
    const jacket = await prisma.jacket.findFirst({
      where: {
        id: Number(id),
      },
        include: {
          sizes: true,
          colors: true,
          items: true
        }
      });

  if (!jacket) {
    return notFound();
  }
  const jackets = await prisma.jacket.findMany({

  })
  return (
    <>
  <JacketPage
    id={jacket.id}
    items={jacket}
    colors={jacket.colors}
    name={jacket.name}
    descr={String(jacket.descr)}
    sizes={jacket.sizes}
    waterproof={String(jacket.waterproof)}
    material={String(jacket.material)}
    care={String(jacket.care)}
    season={String(jacket.season)}
    insulation={String(jacket.insulation)}
    country={String(jacket.country)}
    jackets={jackets}
  />
    </>
  )
}
