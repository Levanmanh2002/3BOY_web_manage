import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../services/employeeApi";

const initialState = {
  listEmployee: {},
};

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async () => {
    const response = await employeeApi.getAllNotPage();
    return {
      ...response.list,
    };
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee(state, { payload }) {
      state.listEmployee = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getEmployee.fulfilled, (state, { payload }) => {
      // Add user to the state array
      state.listEmployee = payload;
    });
  },
});

export const employeeSelector = (state) => state.employee.listEmployee;

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
