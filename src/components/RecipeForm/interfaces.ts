export interface IFormData {
  recipeName: string;
  cuisine: string;
  ingredients: string;
  image: FileList;
}

export interface IRecipe {
  id: string;
  image: string;
  publicId: string;
  recipeName: string;
  cuisine: string;
  ingredients: string;
}

export interface IProps {
  recipe?: IRecipe | null;
}

export interface IUploadImageResponse {
  secure_url: string;
}
