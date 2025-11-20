import type { Metadata } from "next";
import { Koulen } from "next/font/google";
import "../globals.css";

const KoulenSans = Koulen({
  variable: "--font-koulen",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Vitalik jackets",
  description: "Магазин курток",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
       <main className="min-h-screen">
       {children}
       </main></>
  );
}
