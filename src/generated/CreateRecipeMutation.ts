/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRecipeMutation
// ====================================================

export interface CreateRecipeMutation_createRecipe {
  __typename: "Recipe";
  id: string;
}

export interface CreateRecipeMutation {
  createRecipe: CreateRecipeMutation_createRecipe | null;
}

export interface CreateRecipeMutationVariables {
  input: RecipeInput;
}
