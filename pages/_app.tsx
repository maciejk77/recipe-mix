import { AppProps } from "next/app";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";
// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from "src/apollo";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Head>
          <title>Recipe Mix | Weekly meals</title>
          <link rel="icon" href="/cropped-favicon.png" />
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
