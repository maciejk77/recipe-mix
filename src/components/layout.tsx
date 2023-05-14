import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { user, error, isLoading } = useUser();

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
              <Link href="/recipes/add">
                <a>Add Recipe</a>
              </Link>
              <Link href="/api/auth/logout">
                <a>Logout</a>
              </Link>
            </>
          ) : (
            <Link href="/api/auth/login">
              <a>Login | Sign up</a>
            </Link>
          )}
        </div>
      </nav>
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;
