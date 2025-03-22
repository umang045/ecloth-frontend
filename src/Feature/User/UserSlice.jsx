import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import generateExtraReducers from "../GenerateExtraReducer";
import {
  AddToUsersCartService,
  addUsersAddressService,
  adminGetAllOrderService,
  adminGetAllTotalSellService,
  adminGetAllUsersService,
  adminTotalOrderStatusService,
  adminTotalProductsService,
  adminTotalSellService,
  cancleUsersOrderService,
  deleteUsersAddressService,
  getAllSellersOrderService,
  getSellersSingleOrderService,
  getSingleUserService,
  GetTotalUsersService,
  getUserCartService,
  getUsersAddressService,
  getUsersOrderPaymentDetailService,
  getUsersOrderService,
  getUsersSingleOrderService,
  placeUsersOrderService,
  removeFromUsersCartService,
  sellerGetAllTotalProductsService,
  sellerTotalOrderStatusService,
  updateCartQuantityService,
  userUpdateProdilePicService,
} from "./UserService";

//get users
export const getSingleUser = createAsyncThunk(
  "user/get-one",
  async (ThunkAPI) => {
    try {
      return await getSingleUserService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//get users cart
export const getUsersCart = createAsyncThunk(
  "user/get-cart",
  async (ThunkAPI) => {
    try {
      return await getUserCartService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//addt to cart
export const addToUsersCart = createAsyncThunk(
  "user/add-cart",
  async (data, ThunkAPI) => {
    try {
      return await AddToUsersCartService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//remove item from cart
export const removeFromUsersCart = createAsyncThunk(
  "user/remove-cart-item",
  async (id, ThunkAPI) => {
    try {
      return await removeFromUsersCartService(id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//update Quantity from cart
export const updateCartQuantity = createAsyncThunk(
  "user/update-cart-quantity",
  async (data, ThunkAPI) => {
    try {
      return await updateCartQuantityService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//get users address
export const getUsersAddress = createAsyncThunk(
  "user/get-address",
  async (ThunkAPI) => {
    try {
      return await getUsersAddressService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//add users address
export const addUsersAddress = createAsyncThunk(
  "user/add-address",
  async (data, ThunkAPI) => {
    try {
      return await addUsersAddressService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//delete users address
export const deleteUsersAddress = createAsyncThunk(
  "user/delete-address",
  async (id, ThunkAPI) => {
    try {
      return await deleteUsersAddressService(id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//delete users address
export const placeUsersOrder = createAsyncThunk(
  "user/place-order",
  async (data, ThunkAPI) => {
    try {
      return await placeUsersOrderService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//get orders of users
export const getUsersOrders = createAsyncThunk(
  "users/get-all-orders",
  async (ThunkAPI) => {
    try {
      // console.log("slice run");
      return await getUsersOrderService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//get items of users order
export const getSingleUsersOrders = createAsyncThunk(
  "users/get-single-order",
  async (order_id, ThunkAPI) => {
    try {
      // console.log("slice run");
      return await getUsersSingleOrderService(order_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//cncle users order
export const cancleUsersOrder = createAsyncThunk(
  "users/cancle-Order",
  async (data, ThunkAPI) => {
    try {
      return await cancleUsersOrderService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//get items of users order
export const getUsersOrdersPaymentDetails = createAsyncThunk(
  "users/get-order-paymentDetail",
  async (order_id, ThunkAPI) => {
    try {
      // console.log("slice run");
      console.log(order_id);

      return await getUsersOrderPaymentDetailService(order_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//get-seller-allproducts-slice
export const getAllSellersOrders = createAsyncThunk(
  "users/get-sellers-order",
  async (ThunkAPI) => {
    try {
      return await getAllSellersOrderService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getSellersSingleOrders = createAsyncThunk(
  "users/get-sellers-singleOdrder",
  async (order_id, ThunkAPI) => {
    try {
      return await getSellersSingleOrderService(order_id);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminGetAllUsers = createAsyncThunk(
  "users/admin-all-users",
  async (ThunkAPI) => {
    try {
      return await adminGetAllUsersService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminGetAllOrderList = createAsyncThunk(
  "users/admin-all-orders",
  async (ThunkAPI) => {
    try {
      return await adminGetAllOrderService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminGetAllTotalSell = createAsyncThunk(
  "users/admin-all-sell",
  async (ThunkAPI) => {
    try {
      return await adminGetAllTotalSellService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const sellerGetAllTotalProducts = createAsyncThunk(
  "users/seller-total-product",
  async (ThunkAPI) => {
    try {
      return await sellerGetAllTotalProductsService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const GetTotalUsers = createAsyncThunk(
  "users/get-total",
  async (ThunkAPI) => {
    try {
      return await GetTotalUsersService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const sellerTotalOrderStatus = createAsyncThunk(
  "users/get-total-orderstatus",
  async (ThunkAPI) => {
    try {
      return await sellerTotalOrderStatusService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminTotalOrderStatus = createAsyncThunk(
  "users/get-admin-orderStatus",
  async (ThunkAPI) => {
    try {
      return await adminTotalOrderStatusService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminTotalSells = createAsyncThunk(
  "users/get-admin-totalSell",
  async (ThunkAPI) => {
    try {
      return await adminTotalSellService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const adminTotalProducts = createAsyncThunk(
  "users/get-admin-allProducts",
  async (ThunkAPI) => {
    try {
      return await adminTotalProductsService();
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const userUpdateProdilePic = createAsyncThunk(
  "users/update-profilepic",
  async (data ,ThunkAPI) => {
    try {

      return await userUpdateProdilePicService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//place order of  users
//define an initial state
const initialState = {
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    generateExtraReducers(getUsersCart, "usersCart")(builder);
    generateExtraReducers(addToUsersCart, "addToCart")(builder);
    generateExtraReducers(removeFromUsersCart, "removedCartItem")(builder);
    generateExtraReducers(updateCartQuantity, "updatedCartQuantity")(builder);
    generateExtraReducers(getSingleUser, "userInfo")(builder);
    generateExtraReducers(getUsersAddress, "usersAddress")(builder);
    generateExtraReducers(addUsersAddress, "addUsersAddress")(builder);
    generateExtraReducers(deleteUsersAddress, "deleteUsersAddress")(builder);
    generateExtraReducers(placeUsersOrder, "placeUsersOrder")(builder);
    generateExtraReducers(getUsersOrders, "usersOrderList")(builder);
    generateExtraReducers(getSingleUsersOrders, "singleOrderDetails")(builder);
    generateExtraReducers(cancleUsersOrder, "canclledOrder")(builder);
    generateExtraReducers(getAllSellersOrders, "sellersOrderList")(builder);
    generateExtraReducers(adminGetAllUsers, "adminUserList")(builder);
    generateExtraReducers(adminGetAllOrderList, "adminOrderList")(builder);
    generateExtraReducers(adminGetAllTotalSell, "adminTotalSell")(builder);
    generateExtraReducers(sellerGetAllTotalProducts, "sellerTotalProducts")(builder);
    generateExtraReducers(GetTotalUsers, "totalUsers")(builder);
    generateExtraReducers(sellerTotalOrderStatus, "sellerOrderCount")(builder);
    generateExtraReducers(adminTotalOrderStatus, "adminOrderCount")(builder);
    generateExtraReducers(adminTotalProducts, "adminProductList")(builder);
    generateExtraReducers(adminTotalSells, "adminTotalSell")(builder);
    generateExtraReducers(userUpdateProdilePic, "updateProfilePic")(builder);
    generateExtraReducers(
      getSellersSingleOrders,
      "sellersSingleOrderInfo"
    )(builder);
    generateExtraReducers(
      getUsersOrdersPaymentDetails,
      "orderPaymentDetails"
    )(builder);
  },
});

export default usersSlice.reducer;
