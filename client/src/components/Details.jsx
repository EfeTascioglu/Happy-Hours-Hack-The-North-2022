import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
// import Layout from "./components/Layout";

function Details({ event }) {
  if (!event) {
    return <Card title={"Event Details"}></Card>;
  }
  // console.log(event);
  return (
    <Card title={event.title}>
      <h4 style={{ marginTop: "-1em" }}>
        {new Date(event.start).toDateString().split(" ").slice(1, 3).join(" ") +
          " " +
          new Date(event.start).toTimeString().slice(0, 5) +
          " - " +
          new Date(event.end).toTimeString().slice(0, 5)}
      </h4>
      <h5>{event.location}</h5>
      {event.imageLink && (
        <iframe
          width="600"
          height="450"
          style="border:0"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src={event.imageLink}
        ></iframe>
      )}
      <p>{event.description}</p>
    </Card>
  );
}

export default Details;
