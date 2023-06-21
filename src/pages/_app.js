import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import '@/styles/global.css'

export default function App({ Component, pageProps }) {
    return (<>
        <Head>
            <meta name='viewport' content='width=device=widht, initial-scale-1' />
        </Head>
        <main className={` bg-gray-800 `}>
            <Navbar />
            <Component {...pageProps} />
        </main>
    </>
    )
}