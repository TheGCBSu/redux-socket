import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    room: null,
    username: "Guest", // Default name
  },
  reducers: {
    messageReceived: (state, action) => {
      state.messages.push(action.payload);
    },
    sendMessage: (state, action) => {}, // Middleware handles this
    joinRoom: (state, action) => {
      state.room = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { messageReceived, sendMessage, joinRoom, setUsername } =
  chatSlice.actions;
export default chatSlice.reducer;
