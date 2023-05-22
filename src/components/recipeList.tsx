import Link from "next/link";
import { Image } from "cloudinary-react";
import { UseUser, useUser } from "@auth0/nextjs-auth0/dist/client/use-user";

const RecipeList = ({ recipes }) => {
  if (!recipes.length)
    return <p className="text-black p-1 mx-2">No recipes available</p>;

  return (
    <>
      <div className="p-1 text-black">
        {recipes.map(
          ({ recipeName, id, image }: { recipeName: string; id: number }) => (
            <div key={id} className="text-2xl  mx-2  mb-2 p-1 w-6/12">
              <div className="flex items-center">
                <Image
                  src={image}
                  width={60}
                  height={60}
                  className="mr-2 border"
                />
                <Link href={`/recipes/${id}`}>
                  <a>{recipeName}</a>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default RecipeList;
