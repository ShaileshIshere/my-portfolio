import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/BurgerMenu/Header";
import ScrollProgress from '@/components/Enhancements/ScrollProgress'
import CursorTrail from '@/components/Enhancements/CursorTrail'
import CustomCursor from '@/components/Enhancements/CustomCursor';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "my-portfolio",
  description: "my-portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollProgress />
        <CursorTrail />
        <CustomCursor />
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
