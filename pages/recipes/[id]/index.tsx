import { useRouter } from "next/router";
import { Image } from "cloudinary-react";
import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/layout";
import RecipeNav from "src/components/recipeNav";
import {
  ShowRecipeQuery,
  ShowRecipeQueryVariables,
} from "src/generated/ShowRecipeQuery";
import { getSession } from "next-auth/react";

const SHOW_RECIPE_QUERY = gql`
  query ShowRecipeQuery($id: String!) {
    recipe(id: $id) {
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

export default function ShowRecipe() {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return (
    <>
      <RecipeData id={id as string} />
    </>
  );
}

const RecipeData = ({ id }) => {
  const { data, loading } = useQuery<ShowRecipeQuery, ShowRecipeQueryVariables>(
    SHOW_RECIPE_QUERY,
    { variables: { id } }
  );

  if (loading || !data)
    return <Layout main={<div className="text-black">Loading...</div>} />;
  if (!data.recipe)
    return (
      <Layout
        main={<div className="text-black">No recipe found for id: {id}</div>}
      />
    );

  const { recipe } = data;

  const ingredientsList = recipe.ingredients
    .split(",")
    .map((ing) => ing.trim());

  return (
    <Layout
      main={
        <div className="sm:block md:flex text-black">
          <div className="sm:w-full md:w-1/2 p-4">
            <RecipeNav recipe={recipe} />
            <h1 className="text-3xl my-2">{recipe.recipeName}</h1>

            <Image
              className="pb-2"
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={recipe.publicId}
              alt={recipe.recipeName}
              secure
              dpr="auto"
              quality="auto"
              width={900}
              height={Math.floor((9 / 16) * 900)}
              crop="fill"
              gravity="auto"
            />
            <h2 className="text-2xl my-2">{recipe.cuisine}</h2>
            <ul>
              {ingredientsList.map((ing, index) => (
                <li key={index} className="text-xl my-1">
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:w-full md:w-1/2"></div>
        </div>
      }
    />
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
};
