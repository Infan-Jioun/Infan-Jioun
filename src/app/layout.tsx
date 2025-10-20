import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from 'react-hot-toast';
import SplashCursor from './Components/SplashCursor/SplashCursor';
import NavbarPage from "./NavbarPage/page";
import Footer from "./Components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INFAN JIOUN RAHMAN",
  description: "Protfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-poppins bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white animate-gradient`}
      >
        <div className="">
          <SplashCursor />
          <NavbarPage />
          <Toaster />
          {children}
          <Analytics/>
          <Footer />
        </div>
      </body>
    </html>
  );
}