import React from "react";
import Layout from "./components/Layout";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");

function App() {
  return <Layout socket={socket} />;
}

export default App;
