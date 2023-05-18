import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
// import {
//   DeleteRecipe,
//   DeleteRecipeVariables,
// } from "src/generated/DeleteRecipe";
import { useUser } from "@auth0/nextjs-auth0/client";

interface IProps {
  recipe: {
    id: string;
    userId: string;
  };
}

export default function RecipeNav({ recipe }: IProps) {
  // const { user, error, isLoading } = useUser();

  // const canManage = !!user && user.sid === recipe.userId;
  const canManage = true; // TODO

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
        </>
      )}
    </>
  );
}
