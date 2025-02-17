import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
