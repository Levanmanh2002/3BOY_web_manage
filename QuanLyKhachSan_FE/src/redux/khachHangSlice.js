import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerApi from "../services/customerApi";

const initialState = {
  listKhachHang: {},
};

export const getKhachHang = createAsyncThunk(
  "khachHang/getKhachHang",
  async () => {
    const response = await customerApi.getAllNotPage();
    return {
      ...response.list,
    };
  }
);

const khachHangSlice = createSlice({
  name: "khachHang",
  initialState,
  reducers: {
    setKhachHang(state, { payload }) {
      state.listKhachHang = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getKhachHang.fulfilled, (state, { payload }) => {
      // Add user to the state array
      state.listKhachHang = payload;
    });
  },
});

export const khachHangSelector = (state) => state.khachHang.listKhachHang;

export const { setKhachHang } = khachHangSlice.actions;

export default khachHangSlice.reducer;
