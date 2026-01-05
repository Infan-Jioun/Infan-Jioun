import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
    
            <Head>
                <meta
                    name="google-site-verification"
                    content="6m7v72DyRNHTN6Gy7kgsYLxlebc4tynlDQdo_YNLIgQ"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
