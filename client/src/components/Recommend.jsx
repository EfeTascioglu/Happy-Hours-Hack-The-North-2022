import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
// import Layout from "./components/Layout";

function Recommend({ plan }) {
  const [tags, setTags] = React.useState(["sushi", "asian", "cuisine"]);
  if (!plan) {
    return;
    // return <Card title="Event Recommend"></Card>;
  }

  return (
    <Card title="Tags">
      {tags.map((tag, i) => (
        <Tag value={tag} style={{ margin: "3px" }}></Tag>
      ))}
    </Card>
  );
}

export default Recommend;
