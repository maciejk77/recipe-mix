import "reflect-metadata";
import { NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/schema";
import { Context } from "src/schema/context";
import { prisma } from "src/prisma";
// import { useUser } from "@auth0/nextjs-auth0/client";

interface IContext {
  req: NextApiRequest;
}

const server = new ApolloServer({
  schema,
  context: async ({ req }: IContext): Promise<Context> => {
    return {
      uid: "YlkXfZMJIzrEGSIofgERJni0CtdXJxfW", // TODO: fixed dummy user string hre
      prisma,
    };
  },
});

const handler = server.createHandler({ path: "/api/graphql" });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
