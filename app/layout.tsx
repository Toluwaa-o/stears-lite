import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
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

        <main className="w-screen overflow-x-hidden min-h-[65vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
