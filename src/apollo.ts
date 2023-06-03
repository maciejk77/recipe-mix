import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/api/graphql",
  credentials: "same-origin",
});

const authLink = setContext(async (_, { headers }) => {
  let accessToken = "";
  const response = await fetch("/api/token");
  const json = await response.json();

  if (json.accessToken) {
    accessToken = json.accessToken;
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
