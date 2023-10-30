import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomApi from "../services/roomApi";

const initialState = {
  listPhong: {},
};

export const getPhong = createAsyncThunk("phong/getPhong", async () => {
  const response = await roomApi.getAllNotPage();
  return {
    ...response.list,
  };
});

const phongSlice = createSlice({
  name: "phong",
  initialState,
  reducers: {
    setPhong(state, { payload }) {
      state.listPhong = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getPhong.fulfilled, (state, { payload }) => {
      // Add user to the state array
      state.listPhong = payload;
    });
  },
});

export const phongSelector = (state) => state.phong.listPhong;

export const { setPhong } = phongSlice.actions;

export default phongSlice.reducer;
