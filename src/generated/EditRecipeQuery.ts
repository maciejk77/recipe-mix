/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditRecipeQuery
// ====================================================

export interface EditRecipeQuery_recipe {
  __typename: "Recipe";
  id: string;
  userId: string;
  publicId: string;
  image: string;
  recipeName: string;
  cuisine: string;
  ingredients: string;
}

export interface EditRecipeQuery {
  recipe: EditRecipeQuery_recipe | null;
}

export interface EditRecipeQueryVariables {
  id: string;
}
