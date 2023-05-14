import { GetServerSideProps, NextApiRequest } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "src/components/layout";
import RecipeForm from "src/components/recipeForm";

export default function Add() {
  return <Layout main={<RecipeForm />} />;
}

// protected route if not logged in, will be redirected to auth
export const getServerSideProps = withPageAuthRequired();

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {},
//   };
// };
