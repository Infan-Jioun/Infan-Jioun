import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import SplashCursor from "./Components/SplashCursor/SplashCursor";
import NavbarPage from "./NavbarPage/page";
import Footer from "./Components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import LenisProvider from "./Components/LenisProvider/LenisProvider";
import Chatbot from "./ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Infan Jioun Rahman | Full Stack Developer",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and React. Building fast, scalable, and accessible web applications. Open to remote roles and freelance projects.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "React Developer",
    "Web Developer Bangladesh",
    "Infan Jioun Rahman",
    "Freelance Developer",
    "Remote Developer",
  ],
  authors: [{ name: "Infan Jioun Rahman", url: "https://infan-jioun.vercel.app" }],
  creator: "Infan Jioun Rahman",
  metadataBase: new URL("https://infan-jioun.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://infan-jioun.vercel.app",
    title: "Infan Jioun Rahman | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and React. Building fast, scalable, and accessible web applications.",
    siteName: "Infan Jioun Rahman Portfolio",
    images: [
      {
        url: "../../app/assests/op-image.png",
        width: 1200,
        height: 630,
        alt: "Infan Jioun Rahman - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infan Jioun Rahman | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and React.",
    creator: "@RahmanJito",
    images: ["../../app/assests/op-image.png"],
  },
  verification: {
    google: "6m7v72DyRNHTN6Gy7kgsYLxlebc4tynlDQdo_YNLIgQ",
    other: {
      "p:domain_verify": "f06bd7e6a73002c014425c22fdcca63d",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-slate-950" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//i.ibb.co.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

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
                "https://www.facebook.com/InfanJiounRahmanJito.9",
              ],
              jobTitle: "Full Stack Web Developer",
              description:
                "Full Stack Developer specializing in Next.js, TypeScript, and React.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
                addressLocality: "Chattogram",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full font-mono bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <SplashCursor />
          <NavbarPage />
          <Toaster position="top-right" />
          {children}
          <Chatbot />
          <Analytics />
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}