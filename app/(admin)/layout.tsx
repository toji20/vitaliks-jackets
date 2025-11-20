import { Header } from "@/components/shared/header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'MR | ALLIANCE',
  description: '',
  };
  
  export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen">
            {children}
        </main>
    );
  }
  