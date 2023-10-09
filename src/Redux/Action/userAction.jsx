import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerAction = createAsyncThunk(
  "registerAction",
  async (values, { rejectWithValue }) => {
    console.log("🚀 ~ file: userAction.jsx:7 ~ values:", values)
    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        values
      );
      
      console.log(
        "🚀 ~ file: activeConnectionsActions.tsx:11 ~ response:",
        response
      );
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);











export const loginAction = createAsyncThunk(
  "login",
  async (values, { rejectWithValue }) => {
    console.log("🚀 ~ file: userAction.jsx:7 ~ values:", values)
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        values
      );
      if (response?.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.data?.accessToken)
        );
      }
      console.log(
        "🚀 ~ file: activeConnectionsActions.tsx:11 ~ response:",
        response
      );
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userTaskAction = createAsyncThunk(
  "UserTaskAction",
  async (values, { rejectWithValue }) => {
    try {
      const header = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

      const response = await axios.get(
        "http://localhost:8000/user/getUserTask",
        {
          headers: {
            Authorization: header, // Set the Authorization header with the token
          },
        }
      );
      console.log("🚀 ~ file: userAction.jsx:46 ~ response:", response);

      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createUserTaskAction = createAsyncThunk(
  "createUserTaskAction",
  async (values, { rejectWithValue }) => {
    console.log("🚀 ~ file: userAction.jsx:62 ~ values:", values);
    try {
      const header = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

      const response = await axios.post(
        "http://localhost:8000/task/createTask",
        values,
        {
          headers: {
            Authorization: header, // Set the Authorization header with the token
          },
        }
      );
      console.log("🚀 ~ file: userAction.jsx:46 ~ response:", response);

      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserTaskAction = createAsyncThunk(
  "updateUserTaskAction",
  async (values, { rejectWithValue }) => {
    console.log("🚀 ~ file: userAction.jsx:90 ~ values:", values);
    try {
      const header = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

      const response = await axios.put(
        "http://localhost:8000/task/updateTask",
        values,
        {
          headers: {
            Authorization: header, // Set the Authorization header with the token
          },
        }
      );
      console.log("🚀 ~ file: userAction.jsx:46 ~ response:", response);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteUserTaskAction = createAsyncThunk(
  "deleteUserTaskAction",
  async (values, { rejectWithValue }) => {
    console.log("🚀 ~ file: userAction.jsx:90 ~ values:", values);
    try {
      const header = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

      console.log("🚀 ~ file: userAction.jsx:124 ~ header:", header);
      const response = await axios.delete(
        `http://localhost:8000/task/deleteTask/${values}`,
        {
          headers: {
            Authorization: header,
          }
         
        },
        // {
        //   headers: {
        //     Authorization: header, // Set the Authorization header with the token
        //   },
        //   params: values,
        // }
      );
      console.log("🚀 ~ file: userAction.jsx:46 ~ response:", response);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
