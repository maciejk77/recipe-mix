// import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/layout";
import RecipeForm from "src/components/recipeForm";
import {
  EditRecipeQuery,
  EditRecipeQueryVariables,
} from "src/generated/EditRecipeQuery";
import { getSession, useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const { data, loading } = useQuery<EditRecipeQuery, EditRecipeQueryVariables>(
    EDIT_RECIPE_QUERY,
    { variables: { id } }
  );

  if (!session) return null;

  if (loading)
    return <Layout main={<div className="text-black">Loading...</div>} />;
  if (data && !data.recipe)
    return (
      <Layout main={<div className="text-black">Unable to load house</div>} />
    );

  if (session.user?.id !== data?.recipe?.userId)
    return <Layout main={<div>You don't have permission</div>} />;

  return <Layout main={<RecipeForm recipe={data?.recipe} />} />;
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
