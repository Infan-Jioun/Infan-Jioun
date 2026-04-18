// src/app/Home/page.tsx
import type { Metadata } from "next";
import Banner from "./Components/Banner/Banner/Banner";
import HomeAnimations from "./Components/Banner/Components/HomeAnimations";


export const metadata: Metadata = {
    title: "Infan Jioun Rahman | Web Developer",
    description: "Infan Jioun Rahman's Developer Portfolio",
};

export default function HomePage() {
    return (
        <div id="home-root">
            <HomeAnimations />
            <Banner />
        </div>
    );
}