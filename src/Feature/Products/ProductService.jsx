import axios from "axios";
import { base_url, getConfig } from "@/utils/AxiosConfig";

//get object of headers for token authorization from utils file
const config = getConfig();

//get all product of product by filters
export const getAllProducts = async (data) => {
  let selectedCategoryId,
    minPrice,
    maxPrice,
    selectedColorId,
    sortOption,
    currentPage;
  const params = {};
  if (data.selectedCategoryId) {
    params.selected_category_id = data.selectedCategoryId;
  }
  if (data.minPrice) {
    params.min_price = data.minPrice;
  }
  if (data.maxPrice) {
    params.max_price = data.maxPrice;
  }
  if (data.selectedColorId) {
    params.selected_color_id = data.selectedColorId;
  }
  if (data.sortOption) {
    params.sort_option = data.sortOption;
  }
  if (data.currentPage) {
    params.current_page = data.currentPage;
  }

  const response = await axios.get(
    `${base_url}/product/filter`,
    { params },
    config
  );

  if (response.data) return response.data;
};

//getAll product for home
export const getAllProductsService = async (data) => {
  const response = await axios.get(`${base_url}/product`, config);
  if (response.data) return response.data;
};

//get all category of products
export const getAllCategory = async () => {
  const response = await axios.get(`${base_url}/product/category`, config);
  if (response.data) return response.data;
};

//get all colors of products
export const getAllColors = async () => {
  const response = await axios.get(`${base_url}/product/colors`, config);
  if (response.data) return response.data;
};

//getAll Products Review
export const getAllProductReviews = async (id) => {
  const response = await axios.get(`${base_url}/product/review/${id}`, config);
  if (response.data) return response.data;
};

//getAll Products Review
export const getAllReviewsService = async () => {
  const response = await axios.get(`${base_url}/product/getAllReviews`, config);
  if (response.data) return response.data;
};

//get Single Product
export const getSingleProductService = async (id) => {
  // console.log(id);
  const response = await axios.get(`${base_url}/product/${id}`, config);
  if (response.data) return response.data;
};

//add product review
export const addSingleProductReview = async (data) => {
  // console.log(id);
  const response = await axios.post(`${base_url}/product/review`, data, config);
  if (response.data) return response.data;
};

//get All sellers products
export const getAllSellersProductService = async () => {
  const response = await axios.get(`${base_url}/product/sellerProd`, config);
  if (response.data) return response.data;
};

//toogle active inactive button
export const toogleSellerProductService = async (product_id) => {
  const response = await axios.post(
    `${base_url}/product/active/${product_id}`,
    config
  );
  if (response.data) return response.data;
};

//get product all transaction
export const getAllProductTransactionService = async (product_id) => {
  const response = await axios.get(
    `${base_url}/product/getProdTrans/${product_id}`,
    config
  );
  if (response.data) return response.data;
};

//delete product
export const deleteSellerProductService = async (product_id) => {
  const response = await axios.delete(
    `${base_url}/product/${product_id}`,
    config
  );
  if (response.data) return response.data;
};

//upload image
export const uploadImageTocloudinaryService = async (imageData) => {
  const response = await axios.post(
    `${base_url}/product/image/upload`,
    imageData,
    config
  );
  if (response.data) return response.data;
};

//delete image
export const deleteImageFromCloudinaryService = async (public_id) => {
  const response = await axios.delete(
    `${base_url}/product/image/del/${public_id}`,
    config
  );
  if (response.data) return response.data;
};

//add products
export const addSellerProductService = async (productData) => {
  const response = await axios.post(
    `${base_url}/product/`,
    productData,
    config
  );
  if (response.data) return response.data;
};

//get product all transaction
export const adminGetAllProductService = async () => {
  const response = await axios.get(
    `${base_url}/product/admin/getAllProduct`,
    config
  );
  if (response.data) return response.data;
};

//get product all product count
export const getAllProductCountService = async () => {
  const response = await axios.get(
    `${base_url}/product/getAllProductCount`,
    config
  );
  if (response.data) return response.data;
};

//get all products colors
export const getAllProductColorService = async (product_id) => {
  const response = await axios.get(
    `${base_url}/product/getAllProductColors/${product_id}`,
    config
  );
  if (response.data) return response.data;
};

//update products
export const sellerUpdateProductService = async (product_data) => {
  const response = await axios.put(
    `${base_url}/product/updateProducts`,
    product_data,
    config
  );
  if (response.data) return response.data;
};
