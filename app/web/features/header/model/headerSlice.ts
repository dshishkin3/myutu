import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { infoApi } from "app/store/services/info";

interface ICategory { id: number; name: string; filePath: string;};
interface ISubcategory { id: number; name: string; categoriesId: number;};


interface IInitialState {
  isOpenModalCity: boolean;
  isOpenCategory: boolean;
  categories: ICategory[];
  subcategories: ISubcategory[];
  subcategoryName: string;
  filteredSubcategories: ISubcategory[],
  searchString: string;
  isOpenModalSearch: boolean;
  selectCategory: number | null;
}

const initialState: IInitialState = {
  isOpenModalCity: false,
  isOpenCategory: false,
  subcategoryName: "",
  categories: [],
  subcategories: [],
  filteredSubcategories: [],
  searchString: "",
  isOpenModalSearch: false,
  selectCategory: null
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleIsOpenCategory: (state, action: PayloadAction<boolean>) => {
        state.isOpenCategory = action.payload;
    },
    filteredSubcategoriesById: (state, action: PayloadAction<number>) => {
      console.log([...state.subcategories]);
      
      let filteredItem = state.subcategories.filter(item => item.categoriesId === action.payload);
      let findNameCategory = state.categories.find(item => item.id === action.payload);
      
      state.filteredSubcategories = filteredItem;
      state.subcategoryName = findNameCategory?.name || "";
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    toggleIsOpenModalSearch: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalSearch = action.payload;
    },
    toggleIsOpenModalCity: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalCity = action.payload;
    },
    setSelectCategory: (state, action: PayloadAction<number>) => {
      state.selectCategory = action.payload;
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

export const { toggleIsOpenCategory, filteredSubcategoriesById, setSearchString, toggleIsOpenModalSearch, toggleIsOpenModalCity, setSelectCategory} = headerSlice.actions;
export default headerSlice.reducer;
