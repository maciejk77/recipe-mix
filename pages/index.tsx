import Layout from "src/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout
      main={
        <div className="text-black m-2">
          {session ? (
            <p>Welcome {session?.user?.name}</p>
          ) : (
            <div>Please sign in above to get access</div>
          )}
        </div>
      }
    />
  );
}
