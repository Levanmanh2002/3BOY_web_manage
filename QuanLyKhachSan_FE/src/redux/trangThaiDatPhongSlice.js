import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serviceApi from "../services/serviceApi";

const initialState = {
  trangThaiDatPhong: {},
};

export const getTrangThaiDatPhong = createAsyncThunk(
  "trangThaiDat/getTrangThaiDatPhong",
  async () => {
    const response = await serviceApi.getTrangThaiDatPhong();
    return {
      ...response,
    };
  }
);

const trangThaiDatPhongSlice = createSlice({
  name: "trangThaiDat",
  initialState,
  reducers: {
    setTrangThaiDatPhong(state, { payload }) {
      state.trangThaiDatPhong = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTrangThaiDatPhong.fulfilled, (state, { payload }) => {
      // Add user to the state array
      state.trangThaiDatPhong = payload;
    });
  },
});

export const trangThaiDatPhongSelector = (state) =>
  state.trangThaiDat.trangThaiDatPhong;

export const { setTrangThaiDatPhong } = trangThaiDatPhongSlice.actions;

export default trangThaiDatPhongSlice.reducer;
