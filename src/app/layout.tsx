import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import SplashCursor from "./Components/SplashCursor/SplashCursor";
import NavbarPage from "./NavbarPage/page";
import Footer from "./Components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infan Jioun Rahman | Web Developer",
  description: "Next.js & TypeScript Developer Portfolio",
  verification: {
    google: "6m7v72DyRNHTN6Gy7kgsYLxlebc4tynlDQdo_YNLIgQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Infan Jioun Rahman",
              url: "https://infan-jioun.vercel.app",
              sameAs: [
                "https://www.linkedin.com/in/infan-jioun-rahman",
                "https://github.com/Infan-Jioun",
                "https://twitter.com/RahmanJito",
                "https://www.instagram.com/infan_jioun_rahman",
                "https://www.facebook.com/InfanJiounRahmanJito.9"
              ],
              jobTitle: "Web Developer",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD"
              }
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-poppins bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white animate-gradient`}
      >
        <div>
          <SplashCursor />
          <NavbarPage />
          <Toaster />
          {children}
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}