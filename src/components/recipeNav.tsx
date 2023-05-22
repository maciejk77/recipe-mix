import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
} from "src/generated/DeleteRecipeMutation";
import { useUser } from "@auth0/nextjs-auth0/client";

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: String!) {
    deleteRecipe(id: $id)
  }
`;

interface IProps {
  recipe: {
    id: string;
    userId: string;
  };
}

export default function RecipeNav({ recipe }: IProps) {
  const router = useRouter();
  const { user } = useUser();

  const canManage = !!user && user.sid === recipe.userId;

  const [deleteRecipe, { loading }] = useMutation<
    DeleteRecipeMutation,
    DeleteRecipeMutationVariables
  >(DELETE_RECIPE_MUTATION);

  return (
    <>
      <Link href="/">
        <a>home</a>
      </Link>
      <> | </>
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
                router.push("/");
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
