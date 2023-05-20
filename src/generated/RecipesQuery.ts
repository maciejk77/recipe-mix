/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecipesQuery
// ====================================================

export interface RecipesQuery_recipes {
  __typename: "Recipe";
  id: string;
  userId: string;
  publicId: string;
  image: string;
  recipeName: string;
  cuisine: string;
  ingredients: string;
}

export interface RecipesQuery {
  recipes: RecipesQuery_recipes[] | null;
}
