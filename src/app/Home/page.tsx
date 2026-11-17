import type { Metadata } from "next";
import HomeContent from "./Components/HomeContent";

export const metadata: Metadata = {
  title: "Infan Jioun Rahman | Web Developer",
  description: "Infan Jioun Rahman's Developer Portfolio",
};

export default function HomePage() {
  return <HomeContent />;
}
