import React, { useEffect } from "react";
// import Layout from "./components/Layout";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import Chatbox from "./Chatbox";

function Comments({ socket, plan }) {
  const [messages, setMessages] = React.useState([
    {
      text: "Oh, I know a really good sushi place!",
    },
    {
      text: "I just love asian food",
    },
  ]);

  useEffect(() => {
    socket.on("messagePush", (data) => {
      //   data.start = new Date(data.start);
      //   data.end = new Date(data.end);
      setMessages([...messages, data]);
    });
  }, [socket, messages]);
  return (
    <div style={{ height: "290px", overflow: "scroll" }}>
      {messages.map((message, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            margin: "15px 5px",
            padding: "10px 10px",
            border: "1px dashed black",
          }}
        >
          <Avatar
            label={"ABCDEFGHIJKLMNPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]}
            size="small"
          />
          <p style={{ margin: "6px 5px 0px 10px" }}>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
