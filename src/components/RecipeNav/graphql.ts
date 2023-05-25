import { gql } from "@apollo/client";

export const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: String!) {
    deleteRecipe(id: $id)
  }
`;
