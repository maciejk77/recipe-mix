/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRecipeMutation
// ====================================================

export interface UpdateRecipeMutation_updateRecipe {
  __typename: "Recipe";
  id: string;
  publicId: string;
  image: string;
  recipeName: string;
  cuisine: string;
  ingredients: string;
}

export interface UpdateRecipeMutation {
  updateRecipe: UpdateRecipeMutation_updateRecipe | null;
}

export interface UpdateRecipeMutationVariables {
  id?: string | null;
  input: RecipeInput;
}
