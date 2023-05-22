import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/layout";
import RecipeList from "src/components/recipeList";
import { RecipesQuery } from "src/generated/RecipesQuery";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

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

  if (loading) return <div className="text-black">Loading...</div>;
  const { recipes } = data;

  return (
    <Layout
      main={
        <div>
          <h1 className="text-3xl p-3 text-black">Recipes</h1>
          <RecipeList recipes={recipes} />
        </div>
      }
    />
  );
}

export const getServerSideProps = withPageAuthRequired();

// import { withPageAuthRequired } from "@auth0/nextjs-auth0";

// protected route if not logged in, will be redirected to auth
// export const getServerSideProps = withPageAuthRequired();

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {},
//   };
// };
