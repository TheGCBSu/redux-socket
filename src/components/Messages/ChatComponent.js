import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinRoom, setUsername } from "../../chatSlice";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const room = useSelector((state) => state.chat.room);
  const username = useSelector((state) => state.chat.username);
  const [message, setMessage] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [messageType, setMessageType] = useState("message");

  const handleSendMessage = () => {
    if (message.trim() !== "" && room) {
      dispatch({
        type: "socket/sendMessage",
        payload: { type: messageType, content: message },
      });
      setMessage("");
    }
  };

  const handleJoinRoom = () => {
    if (roomInput.trim() !== "") {
      dispatch({ type: "socket/joinRoom", payload: roomInput });
      dispatch(joinRoom(roomInput));
    }
  };

  const handleSetUsername = () => {
    if (nameInput.trim() !== "") {
      dispatch(setUsername(nameInput));
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>

      {/* Set Username */}
      <input
        type="text"
        placeholder="Set username"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <button onClick={handleSetUsername}>Set Name</button>
      <p>Username: {username}</p>

      {/* Join Room */}
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <p>Current Room: {room || "None"}</p>

      {/* Chat Messages */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>
              [{msg.type.toUpperCase()}] {msg.username}:
            </strong>{" "}
            {msg.content}
          </li>
        ))}
      </ul>

      {/* Send Message */}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <select
        onChange={(e) => setMessageType(e.target.value)}
        value={messageType}
      >
        <option value="message">Message</option>
        <option value="command">Command</option>
      </select>
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
