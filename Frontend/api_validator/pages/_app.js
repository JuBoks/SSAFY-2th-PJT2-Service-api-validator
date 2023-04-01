import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Samsung API Validator</title>
        <meta name="description" content="samsung API validator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="./style.css" type="text/css" />
        <link rel="stylesheet" href="../formatters-styles/html.css" type="text/css" />
        <link rel="stylesheet" href="../formatters-styles/annotated.css" type="text/css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
