
import type { Metadata } from "next";
import Banner from "./Components/Banner/Banner/Banner";

export const metadata: Metadata = {
    title: "InfanPortfolio",
    description: "Infan Jioun Rahman's Developer Portfolio",
};

export default function HomePage() {
    return (
        <div className="">

            <Banner/>
        </div>
    );
}