/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShowRecipeQuery
// ====================================================

export interface ShowRecipeQuery_recipe {
  __typename: "Recipe";
  id: string;
  userId: string;
  publicId: string;
  image: string;
  recipeName: string;
  cuisine: string;
  ingredients: string;
}

export interface ShowRecipeQuery {
  recipe: ShowRecipeQuery_recipe | null;
}

export interface ShowRecipeQueryVariables {
  id: string;
}
