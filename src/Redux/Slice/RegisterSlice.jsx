import { createSlice } from "@reduxjs/toolkit";
import { registerAction } from "../Action/userAction";


const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerHandler: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      console.log("🚀 ~ file: activeConnectionslice.ts:34 ~ builder.addCase ~ action:", action);
      state.isLoading = false;
    });
  }
});

export default registerSlice