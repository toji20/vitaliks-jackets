import { AdminPanelWrapper } from "@/components/shared/admin-panel-wrapper";
import { TextEditor } from "@/components/shared/admin-text-editor";
import { JacketForm } from "@/components/shared/jacket-add";
import { JacketList } from "@/components/shared/jacket-list";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await prisma.category.findMany({
  })
  const categoriesI = await prisma.category.findMany({
    include: {
      jackets: true,
      jacketsItems: true
    }
  })
  const jackets = await prisma.jacket.findMany({
        include: {
          colors: true,
          sizes: true
    }
  })
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc'
  }
  })
  const session = await getUserSession();
  if (!session?.id) {
    return redirect('/not-found')
  }
  const user = await prisma.user.findFirst({
         where: {
             id: Number(session?.id),
         }
     });
     if (user?.role === 'USER') {
        return redirect('/not-found');
     }
  return (
    <div className="p-10">
      <AdminPanelWrapper
      orders={orders}
      jackets={jackets}
      categories={categories}
      categoriesI={categoriesI}/>
    </div>
  );
}
