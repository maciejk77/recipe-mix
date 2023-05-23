import "reflect-metadata";
import { NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/schema";
import { Context } from "src/schema/context";
import { prisma } from "src/prisma";
import Cors from "micro-cors";
import { getSession } from "next-auth/react";

interface IContext {
  req: NextApiRequest;
}

const cors = Cors();

const server = new ApolloServer({
  schema,
  context: async ({ req }: IContext): Promise<Context> => {
    const session = await getSession({ req });

    return {
      uid: session?.user?.id,
      prisma,
    };
  },
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
