import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
// import Layout from "./components/Layout";

function Details({ event }) {
  if (!event) {
    return <Card title={"Event Details"}></Card>;
  }
  console.log(event);
  return (
    <Card title={event.title}>
      <h4 style={{ marginTop: "-1em" }}>
        {new Date(event.start).toDateString().split(" ").slice(1, 3).join(" ") +
          " " +
          new Date(event.start).toTimeString().slice(0, 5) +
          " - " +
          new Date(event.end).toTimeString().slice(0, 5)}
      </h4>
      <Avatar label="A" size="large" />
      <p>{event.description}</p>
    </Card>
  );
}

export default Details;
