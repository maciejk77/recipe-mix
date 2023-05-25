import { gql } from "@apollo/client";

export const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($input: RecipeInput!) {
    createRecipe(input: $input) {
      id
    }
  }
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipeMutation($id: String!, $input: RecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      id
      publicId
      image
      recipeName
      cuisine
      ingredients
    }
  }
`;
