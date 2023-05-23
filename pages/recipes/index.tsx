import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/layout";
import RecipeList from "src/components/recipeList";
import { RecipesQuery } from "src/generated/RecipesQuery";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";

const RECIPES_QUERY = gql`
  query RecipesQuery {
    recipes {
      id
      userId
      publicId
      image
      recipeName
      cuisine
      ingredients
    }
  }
`;

export default function Recipes() {
  const { data, loading } = useQuery<RecipesQuery>(RECIPES_QUERY);
  const { status } = useSession();

  if (loading) return <div className="text-black">Loading...</div>;
  const { recipes } = data;
  const isAuthenticated = status === "authenticated";

  return (
    <Layout
      main={
        <div>
          {isAuthenticated && (
            <>
              <h1 className="text-3xl p-3 text-black">Recipes</h1>
              <RecipeList recipes={recipes} />
            </>
          )}
        </div>
      }
    />
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return { props: {} };
};
