import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image } from "cloudinary-react";
import {
  CreateRecipeMutation,
  CreateRecipeMutationVariables,
} from "src/generated/CreateRecipeMutation";
import {
  UpdateRecipeMutation,
  UpdateRecipeMutationVariables,
} from "src/generated/UpdateRecipeMutation";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";
import { IFormData, IRecipe, IProps, IUploadImageResponse } from "./interfaces";
import {
  SIGNATURE_MUTATION,
  CREATE_RECIPE_MUTATION,
  UPDATE_RECIPE_MUTATION,
} from "./graphql";

// helpers
const uploadImage = async (
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? "");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  return response.json();
};

// main component
export default function RecipeForm({ recipe }: IProps) {
  let recipeObject;

  // hooks
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();

  useEffect(() => {
    register({ name: "recipeName" }, { required: "Please enter recipe name" });
    register({ name: "cuisine" }, { required: "Please enter cuisine name" });
    register({ name: "ingredients" }, { required: "Please enter ingredients" });
  }, []);

  const { register, handleSubmit, setValue, errors, watch } =
    useForm<IFormData>({
      defaultValues: recipe ? recipeObject : {},
    });

  // apollo mutations
  const [createSignature] =
    useMutation<CreateSignatureMutation>(SIGNATURE_MUTATION);

  const [createRecipe] = useMutation<
    CreateRecipeMutation,
    CreateRecipeMutationVariables
  >(CREATE_RECIPE_MUTATION);

  const [updateRecipe] = useMutation<
    UpdateRecipeMutation,
    UpdateRecipeMutationVariables
  >(UPDATE_RECIPE_MUTATION);

  recipeObject = {
    recipeName: recipe?.recipeName,
    cuisine: recipe?.cuisine,
    ingredients: recipe?.ingredients,
  };

  // prisma functions
  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature();
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);

      const { data: recipeData } = await createRecipe({
        variables: {
          input: {
            image: imageData.secure_url,
            cuisine: data.cuisine,
            recipeName: data.recipeName,
            ingredients: data.ingredients,
          },
        },
      });

      if (recipeData?.createRecipe) {
        router.push(`/recipes/${recipeData.createRecipe.id}`);
      } else {
        console.log("There was problem with creating recipe on DB");
      }
    }
  };

  const handleUpdate = async (currentRecipe: IRecipe, data: IFormData) => {
    let image = currentRecipe.image;

    if (data.image[0]) {
      const { data: signatureData } = await createSignature();
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        const imageData = await uploadImage(
          data.image[0],
          signature,
          timestamp
        );
        image = imageData.secure_url;
      }
    }

    const { data: recipeData } = await updateRecipe({
      variables: {
        id: currentRecipe.id,
        input: {
          image: image,
          recipeName: data.recipeName,
          cuisine: data.cuisine,
          ingredients: data.ingredients,
        },
      },
    });

    if (recipeData?.updateRecipe) {
      router.push(`/recipes/${currentRecipe.id}`);
    }
  };

  // handlers
  const onSubmit = (data: IFormData) => {
    setSubmitting(true);

    if (!!recipe) {
      handleUpdate(recipe, data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <form
      className="mx-auto max-w-xl py-4 text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl">{recipe ? "Edit" : "Add"} Recipe</h1>
      <div className="mt-4">
        <label
          htmlFor="image"
          className="p-4 border-dashed border-4 border-black block cursor-pointer"
        >
          Click to add image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={register({
            validate: (fileList: FileList) => {
              if (recipe || fileList.length === 1) return true;
              return "Please upload one file";
            },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target;
            if (files?.[0]) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewImage(reader.result as string);
              };
              reader.readAsDataURL(files[0]);
            }
          }}
        />
        {previewImage ? (
          <img
            src={previewImage}
            alt="recipe image"
            className="mt-4 object-cover border border-white"
            style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
          />
        ) : recipe ? (
          <Image
            className="mt-4"
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            publicId={recipe.publicId}
            alt={recipe.recipeName}
            secure
            dpr="auto"
            quality="auto"
            width={576}
            height={Math.floor((9 / 16) * 576)}
            crop="fill"
            gravity="auto"
          />
        ) : null}
        <div className="text-red-500 py-2">
          {errors.image && <p>{errors.image.message}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="recipeName" className="block mb-2 text-lg">
          Recipe Name
        </label>
        <input
          id="recipeName"
          name="recipeName"
          type="text"
          placeholder="Type here i.e basil tomato risotto"
          className="p-2 border border-green-600 text-md rounded-none w-full text-black"
          ref={register({
            required: "Please enter the recipe name",
          })}
        />
        <div className="text-red-500 py-2">
          {errors.recipeName && <p>{errors.recipeName.message}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="cuisine" className="block mb-2 text-lg">
          Cuisine Name
        </label>
        <input
          id="cuisine"
          name="cuisine"
          type="text"
          placeholder="Type here i.e italian"
          className="p-2 border border-green-600 text-md rounded-none w-full text-black"
          ref={register({
            required: "Please enter the cuisine name",
          })}
        />
        <div className="text-red-500 py-2">
          {errors.cuisine && <p>{errors.cuisine.message}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="ingredients" className="block mb-2 text-lg">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          type="text"
          placeholder="Type in a coma delimited list i.e. butter, rice, tomatoes"
          className="p-2 border border-green-600 text-md rounded-none w-full text-black"
          ref={register({
            required: "Please enter the ingredients name",
          })}
        />
        <div className="text-red-500 py-2">
          {errors.ingredients && <p>{errors.ingredients.message}</p>}
        </div>
      </div>
      <div className="m-auto w-48 items-baseline flex justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="bg-red-800 hover:bg-red-700 px-4 py-2 mt-4 mb-12 text-white"
        >
          Save Recipe
        </button>
        <Link href={recipe ? `/recipes/${recipe.id}` : "/"}>
          <a className="text-white">Cancel</a>
        </Link>
      </div>
    </form>
  );
}
