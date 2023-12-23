import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { axSendCreate } from "../api/posts";
import { flag } from "../pages/user/User";


//interface and state
export interface CheckUserPass {
  username: string,
  password: string,
  secPass: string
}

export interface UserState {
  username: string,
  password: string,
  logged: "failed" | "pending",
  balance: number
}

const initialState: UserState = {
  username: "",
  password: "",
  logged: "pending",
  balance: 0
};


//interface and state

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {//login
      state.logged = action.payload.logged;
      state.username = action.payload.username;
      state.balance = action.payload.balance;
    },
    create: (state,action: PayloadAction<CheckUserPass>): void => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      if (state.password === action.payload.secPass && state.password !== "") {
        axSendCreate(state.username, state.password,flag);

      }
    },
    BuyProducts(state, action: PayloadAction<number>) {
      state.balance -= action.payload;      
    },
    TopUp(state, action: PayloadAction<number>) {
      if(action.payload > 0){
      state.balance += action.payload;
      }
    },
  },
});

export const { setUser, create, BuyProducts, TopUp } = appSlice.actions;

export const selectLog = (state: RootState) => state.app;//if logged
export const selectUserName = (state: RootState) => state.app.username;//users name
export const selectUserPass = (state: RootState) => state.app.password;//users password
export const selectUserBalance = (state: RootState) => state.app.balance;//users balance

export default appSlice.reducer;
