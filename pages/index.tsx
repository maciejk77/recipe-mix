import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/layout";
import RecipeList from "src/components/recipeList";
import { RecipesQuery } from "src/generated/RecipesQuery";

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

export default function Home() {
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
