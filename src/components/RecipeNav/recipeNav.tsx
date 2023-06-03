import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
} from "src/generated/DeleteRecipeMutation";
import { IProps } from "./interfaces";
import { DELETE_RECIPE_MUTATION } from "./graphql";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function RecipeNav({ recipe }: IProps) {
  const { user } = useUser();
  const router = useRouter();

  const canManage = !!user && user.sub === recipe.userId;

  const [deleteRecipe, { loading }] = useMutation<
    DeleteRecipeMutation,
    DeleteRecipeMutationVariables
  >(DELETE_RECIPE_MUTATION);

  return (
    <>
      {canManage && (
        <>
          <Link href={`/recipes/${recipe.id}/edit`}>
            <a>edit</a>
          </Link>
          {" | "}
          <button
            disabled={loading}
            type="button"
            onClick={async () => {
              if (confirm("Are you sure?")) {
                await deleteRecipe({ variables: { id: recipe.id } });
                router.push("/recipes");
              }
            }}
          >
            delete
          </button>
        </>
      )}
    </>
  );
}
