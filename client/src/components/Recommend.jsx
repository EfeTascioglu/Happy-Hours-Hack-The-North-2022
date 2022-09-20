import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useEffect } from "react";
import DragDrop from "./DragDrop";
// import Layout from "./components/Layout";

function Recommend({ plan, socket }) {
  const [tags, setTags] = React.useState(["sushi", "asian", "cuisine"]);
  const [value, setValue] = React.useState("");
  const [recs, setRecs] = React.useState([]);

  const addTag = function (e) {
    if (value == "") return;
    e.preventDefault();
    setTags([value, ...tags]);
    setValue("");
  };

  const removeTag = function (str) {
    setTags(tags.filter((x) => x != str));
  };

  useEffect(() => {
    socket.on("newRecs", (data) => {
      //   data.start = new Date(data.start);
      //   data.end = new Date(data.end);
      console.log(data);
      const colours = ["#900021", "#cd6900", "#005d45"];
      setRecs(
        data.map((event) => {
          const timings = [
            ["0.5 h", "08:30"],
            ["0.5 h", "08:30"],
            ["1 h", "09:00"],
            ["1 h", "09:00"],
            ["1 h", "09:00"],
            ["1 h", "09:00"],
            ["1 h", "09:00"],
            ["1.5 h", "09:30"],
            ["1.5 h", "09:30"],
            ["1.5 h", "09:30"],
            ["2 h", "10:00"],
            ["2 h", "10:00"],
          ];
          const inter = Math.floor(Math.random() * timings.length);
          return {
            title: event,
            color: colours[Math.floor(Math.random() * colours.length)],
            start: "08:00",
            end: timings[inter][1],
            length: timings[inter][0],
          };
        })
      );
    });
  }, [socket, recs]);

  useEffect(() => {
    const keywords = tags.join(" ");
    console.log(keywords);
    socket.emit("getLocations", keywords);
    // grabLocationRecs(keywords);
  }, [tags]);

  if (!plan) {
    return;
    return <Card title="Event Recommend"></Card>;
  }
  return (
    <div style={{ height: "50vh", overflow: "hidden", marginBottom: "-1em" }}>
      <Card title="Event Suggestions ->">
        {/* {value} */}
        <form onSubmit={addTag}>
          <InputText
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </form>
        <Divider></Divider>
        {tags.map((tag, i) => (
          <Tag
            key={i}
            onClick={() => removeTag(tag)}
            value={tag}
            style={{ margin: "3px" }}
          ></Tag>
        ))}
      </Card>
      <DragDrop recs={recs}></DragDrop>
    </div>
  );
}

export default Recommend;
