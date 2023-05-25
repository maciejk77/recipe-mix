import { FunctionComponent } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Image } from "cloudinary-react";
import { IProps } from "./interfaces";

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-green-500 text-white max-w-screen-2xl mx-auto">
      <nav className="bg-black text-white" style={{ height: "64px" }}>
        <div className="px-3 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img
                src="/cropped-favicon.png"
                alt="recipe icon"
                className="inline w-12"
              />
            </a>
          </Link>
          {session ? (
            <>
              <div>
                <Link href="/">
                  <a>Home</a>
                </Link>
                {" | "}
                <Link href="/recipes">
                  <a>Recipes</a>
                </Link>
                {" | "}
                <Link href="/recipes/add">
                  <a>Add Recipe</a>
                </Link>
              </div>

              <div className="flex">
                <button className="pr-2" onClick={() => signOut()}>
                  Logout
                </button>
                <Image
                  src={session.user?.image}
                  width={40}
                  height={40}
                  className="mr-2 rounded-3xl"
                />
              </div>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </nav>
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;
