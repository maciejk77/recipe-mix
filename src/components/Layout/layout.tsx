import { FunctionComponent } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import { IProps } from "./interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { user } = useUser();

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
          {user ? (
            <>
              <div data-testid="nav-bar">
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

              <div className="flex items-center">
                <Link href="/api/auth/logout">
                  <a className="pr-2">Logout</a>
                </Link>

                <Image
                  src={user.picture}
                  width={40}
                  height={40}
                  className="mr-2 rounded-3xl"
                />
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">
              <a>Login</a>
            </Link>
          )}
        </div>
      </nav>
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;
