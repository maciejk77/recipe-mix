import { GetServerSideProps, NextApiRequest } from "next";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Layout from "src/components/layout";
import RecipeForm from "src/components/recipeForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  EditRecipeQuery,
  EditRecipeQueryVariables,
} from "src/generated/EditRecipeQuery";

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

  if (!user)
    return <Layout main={<div className="text-black">Please login</div>} />;
  if (loading)
    return <Layout main={<div className="text-black">Loading...</div>} />;
  if (data && !data.recipe)
    return (
      <Layout main={<div className="text-black">Unable to load house</div>} />
    );
  // if (user.uid !== data?.recipe?.userId) // TODO
  if (false) return <Layout main={<div>You don't have permission</div>} />;

  return <Layout main={<RecipeForm recipe={data?.recipe} />} />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // if no uid redirect to /auth
  const uid = true; // TODO

  if (!uid) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};
