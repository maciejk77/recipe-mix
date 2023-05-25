import { GetServerSideProps, NextApiRequest } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "src/components/Layout/layout";
import RecipeForm from "src/components/RecipeForm/recipeForm";

export default function Add() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  return <>{isAuthenticated && <Layout main={<RecipeForm />} />}</>;
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

  return {
    props: { session },
  };
};
