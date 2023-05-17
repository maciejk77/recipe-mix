import "reflect-metadata";
import { NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/schema";
import { Context } from "src/schema/context";
import { prisma } from "src/prisma";
// import { useUser } from "@auth0/nextjs-auth0/client";
import Cors from "micro-cors";

interface IContext {
  req: NextApiRequest;
}

const cors = Cors();

const server = new ApolloServer({
  schema,
  context: async ({ req }: IContext): Promise<Context> => {
    return {
      uid: "YlkXfZMJIzrEGSIofgERJni0CtdXJxfW", // TODO: fixed dummy user string hre
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
