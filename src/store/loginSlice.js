import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  showLogin: true,
  token: "",
  email: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      console.log("loginAction",action);
      console.log("loginState",state);
      state.token = action.payload.idToken;
      state.email = action.payload.email;
      //console.log("state",state.email);
    },
    logout(state) {
      state.token = "";
      state.email = "";
    },
    toggleShowLogin(state) {
      state.showLogin = !state.showLogin;
    },
  },
});

export const loginAction = loginSlice.actions;

export default loginSlice.reducer;
