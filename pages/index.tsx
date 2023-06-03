import Layout from "src/components/Layout/layout";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();
  // console.log("USER: ", user);

  return (
    <Layout
      main={
        <div className="text-black m-2">
          {user ? (
            <p>Welcome {user?.given_name}</p>
          ) : (
            <div>Please sign in above to get access</div>
          )}
        </div>
      }
    />
  );
}
