import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";

const Chatbox = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("HEEE");
      socket.emit("message", {
        text: message,
        // name: localStorage.getItem("userName"),
        // id: `${socket.id}${Math.random()}`,
        // socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div
      className="chat__footer"
      style={{
        position: "absolute",
        bottom: "20px",
        margin: "auto",
      }}
    >
      <form
        className="form"
        onSubmit={handleSendMessage}
        style={{ display: "inline" }}
      >
        <InputText
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          //   onKeyDown={handleTyping}
          style={{
            width: "344px",
          }}
        />
        {/* <button className="sendBtn">SEND</button> */}
      </form>
    </div>
  );
};

export default Chatbox;
