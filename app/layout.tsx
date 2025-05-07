import type { Metadata } from "next";
import { Open_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MdManageSearch } from "react-icons/md";

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
        className={`${openSans.className} antialiased font-[family-name:var(--font-open-sans)] bg-black max-w-screen min-h-screen overflow-x-hidden relative`}
      >
        <header className="w-full px-4 sm:px-5 py-2 border-b border-gray-800 bg-[#0F0F0F] text-white flex items-center justify-between sticky top-0 z-100">
          {/* Logo and Title */}
          <div className="flex items-center gap-1">
            <MdManageSearch size={30} color="white" />
            <h1 className={`${cormorantGaramond.className} text-lg sm:text-xl font-medium`}>
              Stears Lite
            </h1>
          </div>

          {/* Home Button */}
          <Link
            href="/"
            className="text-xs sm:text-sm border border-gray-500 px-2.5 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Home
          </Link>
        </header>


        <main className="p-4 w-screen overflow-x-hidden">
          {children}
        </main>
        <footer className="p-4"></footer>
      </body>
    </html>
  );
}
