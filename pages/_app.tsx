import { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();

  return (
    <>
      <UserProvider>
        <ApolloProvider client={client}>
          <Head>
            <title>Recipe Mix | Weekly meals</title>
            <link rel="icon" href="/cropped-favicon.png" />
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </UserProvider>
    </>
  );
}
