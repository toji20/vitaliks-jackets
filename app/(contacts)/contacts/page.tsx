import { Bg } from "@/components/shared/bg";
import { Catalog } from "@/components/shared/cards-page";
import ContactsPage from "@/components/shared/contacts";
import { Header } from "@/components/shared/header";
import { NavBg } from "@/components/shared/nav-bg";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default async function ConatcsHome() {
  return (
    <div className="">
      <ContactsPage/>
    </div>
  );
}
