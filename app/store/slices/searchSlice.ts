import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { infoApi } from "../services/info";

type Media = { file: File | null, source: string; status: string; };

interface IInitialState {
  categories: any[];
  subcategories: any[];
  filteredSubcategories: any[],
  priceTo: number;
  priceFrom: number;
  city: string;
  hashTag: any[];
  categoryId: number | undefined;
  subcategoryId: number | undefined;
  type: string;
}


const initialState: IInitialState = {
    type: "PRODUCT",
    categories: [],
    subcategories: [],
    filteredSubcategories: [],
    priceTo: 1000000,
    priceFrom: 0,
    city: "",
    hashTag: [],
    categoryId: undefined,
  subcategoryId: undefined
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    filterByCategory: (state, action:PayloadAction<{ categoriesId: number }>) => {
        let arr = state.subcategories.filter((item) => item.categoriesId === action.payload.categoriesId);
        state.filteredSubcategories = arr;
    },
    setPriceTo: (state, action: PayloadAction<number>) => {
        state.priceTo = action.payload;
    },
    setPriceFrom: (state, action: PayloadAction<number>) => {
        state.priceFrom = action.payload;
    },
    setHashTag: (state, action: PayloadAction<{ id: number; name: string }>) => {
        state.hashTag.push(action.payload);
    },
    removeHashTag: (state, action: PayloadAction<number>) => {
        state.hashTag.splice(action.payload, 1);
    },
    setCity: (state, action: PayloadAction<string>) => {
        state.city = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
        let filteredItem = state.subcategories.filter(item => item.categoriesId === action.payload);
        state.categoryId = action.payload;
        state.filteredSubcategories = filteredItem;
    },
    setSubcategoryId: (state, action: PayloadAction<number>) => {
        state.subcategoryId = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
        state.type = action.payload;
    }
  },
  extraReducers: (builder) => {
      builder.addMatcher(infoApi.endpoints.getAllCategories.matchFulfilled, (state, action) => {
         state.categories = action.payload;
      })
      builder.addMatcher(infoApi.endpoints.getAllSubCategories.matchFulfilled, (state, action) => {
         state.subcategories = action.payload;
      })
  }
});

export const { 
  filterByCategory,
  setPriceTo,
  setPriceFrom,
  setHashTag,
  removeHashTag,
  setCity,
  setCategoryId,
setSubcategoryId,
setType
 } = searchSlice.actions;
export default searchSlice.reducer;
