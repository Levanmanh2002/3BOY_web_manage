import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: {},
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoleList(state, { payload }) {
      state.roleList = payload;
    },
  },
});

export const roleListSelector = (state) => state.role.roleList;

export const { setRoleList } = roleSlice.actions;

export default roleSlice.reducer;
