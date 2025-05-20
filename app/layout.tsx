import type { Metadata } from "next";
import { Open_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MdManageSearch } from "react-icons/md";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Stears Lite",
  description: "Stears lite app (Inspired largely by Stears.co) with company research capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased font-[family-name:var(--font-open-sans)] bg-gray-50 max-w-screen min-h-screen overflow-x-hidden relative`}
      >
        <Header />

        <main className="w-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
