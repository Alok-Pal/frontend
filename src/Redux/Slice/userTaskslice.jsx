import { createSlice } from "@reduxjs/toolkit";
import { createUserTaskAction, userTaskAction } from "../Action/userAction";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

// const userTaskSlice = createSlice({
//   name: "userTask",
//   initialState,
//   reducers: {
//     userTaskHandler: (state, action) => {
//       state.data = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(userTaskAction.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(userTaskAction.fulfilled, (state, action) => {
//       state.data = action.payload;
//       state.isLoading = false;
//     });
//     builder.addCase(userTaskAction.rejected, (state, action) => {
//       state.isLoading = false;
//     });
//   },
// });

const createUserTaskSlice = createSlice({
  name: "createUserTaskSlice",
  initialState,
  reducers: {
    createUserTasHandler: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userTaskAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userTaskAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(userTaskAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(createUserTaskAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUserTaskAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createUserTaskAction.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default createUserTaskSlice;
