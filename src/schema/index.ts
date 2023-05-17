import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { ImageResolver } from "./image";
import { RecipeResolver } from "./recipe";
import { authChecker } from "./auth";

@Resolver()
class DummyResolver {
  @Query((_returns) => String)
  hello() {
    return "Hiya! nice to meet you!";
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver, ImageResolver, RecipeResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
