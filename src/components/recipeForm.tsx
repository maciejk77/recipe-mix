import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { Image } from "cloudinary-react";
// import { SearchBox } from "./searchBox";
// import {
//   CreateRecipeMutation,
//   CreateRecipeMutationVariables,
// } from "src/generated/CreateRecipeMutation";
// import {
//   UpdateRecipeMutation,
//   UpdateRecipeMutationVariables,
// } from "src/generated/UpdateRecipeMutation";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

// import { useUser } from "@auth0/nextjs-auth0/client";

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

interface IUploadImageResponse {
  secure_url: string;
}

const uploadImage = async (
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> => {
  const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
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

interface IFormData {
  recipeName: string;
  cuisine: string;
  ingredients: string;
  image: FileList;
}

interface IProps {}

export default function RecipeForm({}: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const { register, handleSubmit, setValue, errors, watch } = useForm<
    IFormData
  >({ defaultValues: {} });
  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  );

  // const { user } = useUser();
  // console.log("user: ", user);

  useEffect(() => {
    register({ name: "recipeName" }, { required: "Please enter recipe name" });
    register({ name: "cuisine" }, { required: "Please enter cuisine name" });
    register({ name: "ingredients" }, { required: "Please enter ingredients" });
  }, []);

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature();
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);
    }
  };

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add a New Recipe</h1>
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
              if (fileList.length > 0) return true;
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
        {previewImage && (
          <img
            src={previewImage}
            alt="recipe image"
            className="mt-4 object-cover border border-white"
            style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
          />
        )}
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
          className="bg-red-800 hover:bg-red-700 px-4 py-2 mt-4 mb-12"
        >
          Save Recipe
        </button>
        <Link href="/">
          <a>Cancel</a>
        </Link>
      </div>
    </form>
  );
}
