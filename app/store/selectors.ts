import { selector } from "recoil";

import { categoryID } from "./atoms";

import { getSubcategories } from '../services/category.api';

export const subcategoriesSelector = selector({
  key: 'subcategoriesSelector',
  get: async ({ get }) => {
    const id = get(categoryID);

    if (!id) {
      return null;
    }

    const subcategories = await getSubcategories(id);
    
    return subcategories;
  }
})
