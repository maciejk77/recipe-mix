import { buildSchemaSync } from "type-graphql";
import { ImageResolver } from "./image";
import { RecipeResolver } from "./recipe";
import { authChecker } from "./auth";

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, RecipeResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
