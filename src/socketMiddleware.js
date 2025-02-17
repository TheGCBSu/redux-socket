import { io } from "socket.io-client";
import { messageReceived } from "./chatSlice";

export const socketMiddleware = (store) => {
  let socket = io("http://localhost:5000"); // Adjust to your backend
  let listenersAdded = false;

  return (next) => (action) => {
    const state = store.getState();
    const room = state.chat.room; // Get current room from Redux

    if (action.type === "socket/sendMessage") {
      const messageData = {
        room,
        username: state.chat.username, // Add username for tracking
        type: action.payload.type, // "message" or "command"
        content: action.payload.content,
      };
      socket.emit("send_data", messageData);
    }

    if (action.type === "socket/joinRoom") {
      socket.emit("join_room", {
        room: action.payload,
        username: state.chat.username,
      });
    }

    if (!listenersAdded) {
      listenersAdded = true;

      socket.on("message", (data) => {
        store.dispatch(messageReceived(data));
      });

      socket.on("command", (data) => {
        store.dispatch(messageReceived(data));
      });
    }

    return next(action); // Continue the action chain
  };
};
