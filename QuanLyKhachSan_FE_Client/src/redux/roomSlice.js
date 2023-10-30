import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomInfo: {},
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomInfo(state, { payload }) {
      state.roomInfo = payload;
    },
  },
});

export const roomInfoSelector = (state) => state.room?.roomInfo;

export const { setRoomInfo } = roomSlice.actions;

export default roomSlice.reducer;
