import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./AuthService";
import generateExtraReducers from "../GenerateExtraReducer";

// Define a type for the state

//register-slice
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, ThunkAPI) => {
    try {
      return await authService.registerUser(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//login-slice
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, ThunkAPI) => {
    try {
      return await authService.loginUser(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//mailsend-slice
export const sendMail = createAsyncThunk(
  "auth/send-mail",
  async (data, ThunkAPI) => {
    try {
      return await authService.sendMail(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//updatepassword-slice
export const updateUserPassword = createAsyncThunk(
  "auth/update-pass",
  async (data, ThunkAPI) => {
    try {
      return await authService.updateUserPassword(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//update-profile-slice
export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (data, ThunkAPI) => {
    try {
      // console.log(data);
      return await authService.updateProfileService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//update-profile-pass-slice
export const updateUserPasswordFromProfile = createAsyncThunk(
  "auth/update-profile-pass",
  async (data, ThunkAPI) => {
    try {
      return await authService.updateUserPasswordFromProfileService(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

//declare initial state for auth - Chanable by requirements
const initialState = {
  auth: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//create Slice for auth reusable for all auth related actions
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    generateExtraReducers(loginUser, "authLogin")(builder);
    generateExtraReducers(registerUser, "authRegister")(builder);
    generateExtraReducers(sendMail, "sendMail")(builder);
    generateExtraReducers(updateUserPassword, "updateUserPassword")(builder);
    generateExtraReducers(updateProfile, "updateUserProfile")(builder);
    generateExtraReducers(updateUserPasswordFromProfile, "updatePass")(builder);
  },
});

//export this reducer which can usable in store
export default authSlice.reducer;
