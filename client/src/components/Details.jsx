import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
// import Layout from "./components/Layout";

function Details() {
  return (
    <Card title="Description">
      {/* Content */}
      <Avatar label="P" size="large" />
      <p>Testing</p>
    </Card>
  );
}

export default Details;
