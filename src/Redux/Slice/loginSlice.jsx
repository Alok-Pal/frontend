import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../Action/userAction";


const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      console.log("🚀 ~ file: activeConnectionslice.ts:34 ~ builder.addCase ~ action:", action);
      state.isLoading = false;
    });
  }
});

export default loginSlice