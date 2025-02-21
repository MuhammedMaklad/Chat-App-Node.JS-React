import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface InitialState {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  token: string;
  onlineUser: string[];
  socketConnection: Socket | null;
}
const initialState: InitialState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  onlineUser: [],
  socketConnection: null
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
      state.token = action.payload.token;
    },
    setOnlineUser: (state, action: PayloadAction<string[]>) => {
      state.onlineUser = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
      state.socketConnection = null;
    }
  }
})

export const { setUser, logout, setToken, setOnlineUser, setSocketConnection } = userSlice.actions;

export default userSlice.reducer; // Export the reducer for the user slice
