// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta
          name="Hiking Buddy"
          content="Aplikasi untuk para pendaki gunung"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
