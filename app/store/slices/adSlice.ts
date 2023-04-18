import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { infoApi } from "../services/info";
import { stringify } from "querystring";

type Media = { file: File | null, source: string; status: string; };

interface IInitialState {
  images: Media[];
  video: Media;
  preview: Media
}

const initialFile = { file: null, source: "", status: "failed", link: null };

const initialState: IInitialState & any = {
    images: [],
    video: JSON.parse(JSON.stringify(initialFile)),
    preview: JSON.parse(JSON.stringify(initialFile)),
    categories: [],
    subcategories: [],
    filteredSubcategories: [],
    location: {
      latitude: null,
      longitude: null,
      addressLine: null,
      city: null
    }
};

export const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<any>) => {
      state.images.push(action.payload);
    },
    setVideo: (state, action: PayloadAction<any>) => {
      state.video = action.payload;
    },
    setPreview: (state, action: PayloadAction<any>) => {
      state.preview = action.payload;
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1);
    },
    removeVideo: (state) => {
      state.video = { file: null, source: "", status: "failed", link: null }
    },
    removePreview: (state) => {
      state.preview = { file: null, source: "", status: "failed", link: null }
    },
    resetUploads: (state) => {
      state.preview = JSON.parse(JSON.stringify(initialFile));
      state.video = JSON.parse(JSON.stringify(initialFile));
      state.images = [];
    },
    filteredSubcategory: (state, action: PayloadAction<number>) => {
      let filteredItem = state.subcategories.filter(item => item.categoriesId === action.payload);
        state.filteredSubcategories = filteredItem;
    },
    setLocation: (state, action: PayloadAction<{ name: string; value: string | number }>) => {
      const { name, value } = action.payload;
      state.location[name] = value;
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
  setImages,
  setVideo,
  setPreview,
  filteredSubcategory,
  removeImage,
  removeVideo,
  removePreview,
  resetUploads,
  setLocation
 } = adSlice.actions;
export default adSlice.reducer;
