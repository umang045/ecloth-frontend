import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const generateSliceApi = () => {
  return createAsyncThunk("auth/login", async (data, ThunkAPI) => {
    try {
      return await authService.loginUser(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  });
};
