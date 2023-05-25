import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
} from "src/generated/DeleteRecipeMutation";
import { useSession } from "next-auth/react";
import { IProps } from "./interfaces";
import { DELETE_RECIPE_MUTATION } from "./graphql";

export default function RecipeNav({ recipe }: IProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const canManage = !!session?.user && session.user.id === recipe.userId;

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
