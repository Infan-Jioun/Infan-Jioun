import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
       
            <Head>
                <meta
                    name="google-site-verification"
                    content="945qTSDrLsILlzga1753n4g9rViHZ5VvaWaTJNas0VI"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
