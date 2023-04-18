import { ITag } from "../models/models";

export async function getAllCategories() {
  try {
    const res = await fetch(`${process.env.api_root}/tags/categoriesAll`);

    const { Data } = await res.json();
    
    return Data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSubcategories(id: number | string) {
  try {
    const res = await fetch(`${process.env.api_root}/tags/subcategories/{"Category":"${id}"}`);

    const { Data } = await res.json();

    return Data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryTags(id: number | string): Promise<ITag[] | undefined> {
  try {
    const res = await fetch(`${process.env.api_root}/tags/{"Category":"${id}"}`);

    const { Data } = await res.json();

    return Data;
  } catch (error) {
    console.log(error);
  }
}