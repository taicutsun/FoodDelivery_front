import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
