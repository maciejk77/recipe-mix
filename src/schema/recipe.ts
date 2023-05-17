import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from "type-graphql";
import type { Context, AuthorizedContext } from "./context";

@InputType()
class RecipeInput {
  @Field((_type) => String)
  image!: string;

  @Field((_type) => String)
  recipeName!: string;

  @Field((_type) => String)
  cuisine!: string;

  @Field((_type) => String)
  ingredients!: string;
}

@ObjectType()
class Recipe {
  @Field((_type) => ID)
  id!: number;

  @Field((_type) => String)
  userId!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => String)
  recipeName!: string;

  @Field((_type) => String)
  cuisine!: string;

  @Field((_type) => String)
  ingredients!: string;

  @Field((_type) => String)
  publicId(): string {
    const parts = this.image.split("/");
    return parts[parts.length - 1];
  }
}

@Resolver()
export class RecipeResolver {
  @Query((_returns) => Recipe, { nullable: true })
  async recipe(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await ctx.prisma.recipe.findUnique({
      where: { id: parseInt(id, 10) },
    });
  }

  @Authorized()
  @Mutation((_returns) => Recipe, { nullable: true })
  async createRecipe(
    @Arg("input") input: RecipeInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    return await ctx.prisma.recipe.create({
      data: {
        userId: ctx.uid,
        image: input.image,
        recipeName: input.recipeName,
        cuisine: input.cuisine,
        ingredients: input.ingredients,
      },
    });
  }
}
