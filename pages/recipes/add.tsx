import { GetServerSideProps } from "next";
import Layout from "src/components/Layout/layout";
import RecipeForm from "src/components/RecipeForm/recipeForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Add() {
  const { user } = useUser();

  return <>{user && <Layout main={<RecipeForm />} />}</>;
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
