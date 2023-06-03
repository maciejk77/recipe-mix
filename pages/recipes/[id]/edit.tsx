import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/Layout/layout";
import RecipeForm from "src/components/RecipeForm/recipeForm";
import {
  EditRecipeQuery,
  EditRecipeQueryVariables,
} from "src/generated/EditRecipeQuery";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const EDIT_RECIPE_QUERY = gql`
  query EditRecipeQuery($id: String!) {
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

export default function EditRecipe() {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return <RecipeData id={id as string} />;
}

interface IRecipeProps {
  id: string;
}

export const RecipeData = ({ id }: IRecipeProps) => {
  const { user } = useUser();
  const { data, loading } = useQuery<EditRecipeQuery, EditRecipeQueryVariables>(
    EDIT_RECIPE_QUERY,
    { variables: { id } }
  );

  if (!user) return null;

  if (loading)
    return <Layout main={<div className="text-black">Loading...</div>} />;
  if (data && !data.recipe)
    return (
      <Layout main={<div className="text-black">Unable to load recipe</div>} />
    );

  if (user.sub !== data?.recipe?.userId)
    return <Layout main={<div>You don't have permission</div>} />;

  return <Layout main={<RecipeForm recipe={data?.recipe} />} />;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
