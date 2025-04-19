import axios from "axios";
import { base_url, getConfig } from "../../utils/AxiosConfig";

//get object of headers for token authorization from utils file
const config = getConfig();

//get single user for user info
export const getSingleUserService = async () => {
  const response = await axios.get(`${base_url}/user/singleUser`, config);
  if (response.data) return response.data;
};

//get cart of user
export const getUserCartService = async () => {
  const response = await axios.get(`${base_url}/user/getCart`, config);
  if (response.data) return response.data;
};

//add items to cart
export const AddToUsersCartService = async (data) => {
  const response = await axios.post(`${base_url}/user/addCart`, data, config);
  if (response.data) return response.data;
};

//remove items from cart
export const removeFromUsersCartService = async (id) => {
  const response = await axios.delete(`${base_url}/user/delCart/${id}`, config);
  if (response.data) return response.data;
};

//update quantity from cart
export const updateCartQuantityService = async (data) => {
  const response = await axios.put(`${base_url}/user/updtQnty/`, data, config);
  if (response.data) return response.data;
};

//get all addresses from users cart
export const getUsersAddressService = async () => {
  const response = await axios.get(`${base_url}/user/getAddress/`, config);
  if (response.data) return response.data;
};

//add users addresses
export const addUsersAddressService = async (data) => {
  const response = await axios.post(
    `${base_url}/user/addAddress`,
    data,
    config
  );
  if (response.data) return response.data;
};

//delete users addresses
export const deleteUsersAddressService = async (id) => {
  const response = await axios.delete(
    `${base_url}/user/delAddress/${id}`,
    config
  );
  if (response.data) return response.data;
};

//place order of users
export const placeUsersOrderService = async (data) => {
  const response = await axios.post(`${base_url}/user/addorder`, data, config);
  if (response.data) return response.data;
};

//cancle order
export const cancleUsersOrderService = async (data) => {
  const response = await axios.post(
    `${base_url}/user/delUserOrder`,
    data,
    config
  );
  if (response.data) return response.data;
};

//get users orders
export const getUsersOrderService = async () => {
  const response = await axios.get(`${base_url}/user/getUserOrder`, config);
  if (response.data) return response.data;
};

//get single order of user
export const getUsersSingleOrderService = async (order_id) => {
  const response = await axios.get(
    `${base_url}/user/getUserOrderProd/${order_id}`,
    config
  );
  if (response.data) return response.data;
};

//get single order of user
export const getUsersOrderPaymentDetailService = async (order_id) => {
  const response = await axios.get(
    `${base_url}/user/getUsersOrdersPaymentDetails/${order_id}`,
    config
  );
  if (response.data) return response.data;
};

//get all sellers order
export const getAllSellersOrderService = async () => {
  const response = await axios.get(`${base_url}/user/seller/getOrder`, config);
  if (response.data) return response.data;
};

//get sellers single order
export const getSellersSingleOrderService = async (order_id) => {
  const response = await axios.get(
    `${base_url}/user/seller/getSinlgeOrder/${order_id}`,
    config
  );
  if (response.data) return response.data;
};

//get all users for admin
export const adminGetAllUsersService = async () => {
  const response = await axios.get(`${base_url}/user/find/all`, config);
  if (response.data) return response.data;
};

//get all orders for admin
export const adminGetAllOrderService = async () => {
  const response = await axios.get(
    `${base_url}/user/admin/getOrdersForAdmin`,
    config
  );
  if (response.data) return response.data;
};

//get total product count for admin
export const adminGetAllTotalSellService = async () => {
  const response = await axios.get(
    `${base_url}/user/seller/getAllSellCount`,
    config
  );
  if (response.data) return response.data;
};

//get seller total product count
export const sellerGetAllTotalProductsService = async () => {
  const response = await axios.get(
    `${base_url}/user/seller/getAllProdCount`,
    config
  );
  if (response.data) return response.data;
};

//get total user
export const GetTotalUsersService = async () => {
  const response = await axios.get(
    `${base_url}/user/totalUser`,
    config
  );
  if (response.data) return response.data;
};

//seller total orders
export const sellerTotalOrderStatusService = async () => {
  const response = await axios.get(
    `${base_url}/user/seller/getOrderStatusCount`,
    config
  );
  if (response.data) return response.data;
};

//admin total orders
export const adminTotalOrderStatusService = async () => {
  const response = await axios.get(
    `${base_url}/user/admin/getStatusCount`,
    config
  );
  if (response.data) return response.data;
};

//admin total sell service
export const adminTotalSellService = async () => {
  const response = await axios.get(
    `${base_url}/user/admin/getAllAmountCountForAdmin`,
    config
  );
  if (response.data) return response.data;
};

//admin total products service
export const adminTotalProductsService = async () => {
  const response = await axios.get(
    `${base_url}/product/admin/getAllProduct`,
    config
  );
  if (response.data) return response.data;
};

//update profile 
export const userUpdateProdilePicService = async (data) => {
  const response = await axios.post(
    `${base_url}/auth/updateProfilePic`,
    data,
    config
  );
  if (response.data) return response.data;
};
