import { useQuery, gql } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "src/components/Layout/layout";
import RecipeList from "src/components/RecipeList/recipeList";
import { RecipesQuery } from "src/generated/RecipesQuery";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

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
  const { user } = useUser();

  if (loading) return <div className="text-black">Loading...</div>;

  const { recipes } = data;

  return (
    <Layout
      main={
        <div>
          {user && (
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

export const getServerSideProps = withPageAuthRequired();
