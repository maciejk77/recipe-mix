import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo";
import "../styles/index.css";

export default function MyApp({ Component, pageProps, session }: AppProps) {
  const client = useApollo();

  return (
    <>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <Head>
            <title>Recipe Mix | Weekly meals</title>
            <link rel="icon" href="/cropped-favicon.png" />
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}
