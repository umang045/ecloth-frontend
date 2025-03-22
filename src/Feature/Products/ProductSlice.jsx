import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import generateExtraReducers from "../GenerateExtraReducer";
import {
  addSellerProductService,
  addSingleProductReview,
  adminGetAllProductService,
  deleteImageFromCloudinaryService,
  deleteSellerProductService,
  getAllCategory,
  getAllColors,
  getAllProductColorService,
  getAllProductCountService,
  getAllProductReviews,
  getAllProducts,
  getAllProductsService,
  getAllProductTransactionService,
  getAllReviewsService,
  getAllSellersProductService,
  getSingleProductService,
  sellerUpdateProductService,
  toogleSellerProductService,
  uploadImageTocloudinaryService,
} from "./ProductService";

export const getAllFilterProducts = createAsyncThunk(
  "product/get-all",
  async (data, ThunkAPI) => {
    try {
      // console.log(data , ThunkAPI);
      return await getAllProducts(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductsWithoutFilter = createAsyncThunk(
  "product/get-all-withoutfilter",
  async (ThunkAPI) => {
    try {
      return await getAllProductsService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductsColor = createAsyncThunk(
  "product/get-all-colors",
  async (ThunkAPI) => {
    try {
      return await getAllColors();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductsCategory = createAsyncThunk(
  "product/get-all-category",
  async (ThunkAPI) => {
    try {
      return await getAllCategory();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/get-single-product",
  async (id, ThunkAPI) => {
    try {
      // console.log(id);
      return await getSingleProductService(id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleProductsReviews = createAsyncThunk(
  "product/get-reviews",
  async (id, ThunkAPI) => {
    try {
      return await getAllProductReviews(id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductsReviews = createAsyncThunk(
  "product/get-all-reviews",
  async (ThunkAPI) => {
    try {
      // console.log(id);
      return await getAllReviewsService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const addSingleProductsReviews = createAsyncThunk(
  "product/add-reviews",
  async (data, ThunkAPI) => {
    try {
      // console.log(id);
      return await addSingleProductReview(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllSellersProducts = createAsyncThunk(
  "products/seller-get-all",
  async (ThunkAPI) => {
    try {
      return await getAllSellersProductService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const toogleSellerProduct = createAsyncThunk(
  "products/seller-product-toogle",
  async (product_id, ThunkAPI) => {
    try {
      // console.log(product_id);
      return await toogleSellerProductService(product_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getSellersProductsTransaction = createAsyncThunk(
  "products/seller-product-transaction",
  async (product_id, ThunkAPI) => {
    try {
      return await getAllProductTransactionService(product_id);
      // if(statuscodd == 200)
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteSellerProduct = createAsyncThunk(
  "products/seller-delete-product",
  async (product_id, ThunkAPI) => {
    try {
      // console.log(product_id);
      return await deleteSellerProductService(product_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadImgToCloudinary = createAsyncThunk(
  "product/upload",
  async (imgData, ThunkAPI) => {
    try {
      return await uploadImageTocloudinaryService(imgData);
    } catch (error) {
      return ThunkAPI.rejectWithValue(imgData);
    }
  }
);

export const deleteImgFromCloudinary = createAsyncThunk(
  "product/delete-image",
  async (public_id, ThunkAPI) => {
    try {
      return await deleteImageFromCloudinaryService(public_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(imgData);
    }
  }
);

export const addSellerProduct = createAsyncThunk(
  "product/add",
  async (data, ThunkAPI) => {
    try {
      // console.log(id);
      return await addSellerProductService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminGetAllProducts = createAsyncThunk(
  "product/admin-getAllProducts",
  async (ThunkAPI) => {
    try {
      // console.log(id);
      return await adminGetAllProductService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductCount = createAsyncThunk(
  "product/admin-getAllProducts-count",
  async (ThunkAPI) => {
    try {
      return await getAllProductCountService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductColor = createAsyncThunk(
  "product/admin-getProducts-color",
  async (product_id, ThunkAPI) => {
    try {
      return await getAllProductColorService(product_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const sellerUpdateProduct = createAsyncThunk(
  "product/seller-updateProduct",
  async (product_data, ThunkAPI) => {
    try {
      return await sellerUpdateProductService(product_data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//declare initial state for auth - Chanable by requirements
const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//create Slice for auth reusable for all auth related actions
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    generateExtraReducers(getAllFilterProducts, "productList")(builder);
    generateExtraReducers(
      getAllProductsWithoutFilter,
      "withoutFilterProductList"
    )(builder);
    generateExtraReducers(getAllProductsColor, "colorList")(builder);
    generateExtraReducers(getAllProductsCategory, "categoryList")(builder);
    generateExtraReducers(getSingleProduct, "singleProduct")(builder);
    generateExtraReducers(getAllProductsReviews, "allReviewList")(builder);
    generateExtraReducers(getAllSellersProducts, "sellerProductList")(builder);
    generateExtraReducers(toogleSellerProduct, "toogleSellerProduct")(builder);
    generateExtraReducers(deleteSellerProduct, "deleteSellerProduct")(builder);
    generateExtraReducers(uploadImgToCloudinary, "uploadImageToCloud")(builder);
    generateExtraReducers(addSellerProduct, "addSellerProduct")(builder);
    generateExtraReducers(adminGetAllProducts, "adminProductList")(builder);
    generateExtraReducers(getAllProductCount, "totalProducts")(builder);
    generateExtraReducers(getAllProductColor, "productColorList")(builder);
    generateExtraReducers(sellerUpdateProduct, "sellerUpdateProduct")(builder);
    generateExtraReducers(
      deleteImgFromCloudinary,
      "deleteImageFromCloud"
    )(builder);
    generateExtraReducers(
      getSellersProductsTransaction,
      "productTransactionInfo"
    )(builder);
    generateExtraReducers(
      getSingleProductsReviews,
      "singleProductsReviewList"
    )(builder);
    generateExtraReducers(
      addSingleProductsReviews,
      "addSingleProdReview"
    )(builder);
  },
});

export default productsSlice.reducer;
