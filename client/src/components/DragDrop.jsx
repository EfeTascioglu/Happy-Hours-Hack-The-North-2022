import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Draggable, setOptions } from "@mobiscroll/react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const sampleTasks = [
  {
    title: "Bubble Soccer",
    color: "#7a5886",
    start: "08:00",
    end: "08:30",
    length: "0.5 h",
  },
  {
    title: "Free Boba",
    color: "#9da721",
    start: "08:00",
    end: "09:30",
    length: "1.5 h",
  },
  {
    title: "Among Us",
    color: "#cd6957",
    start: "08:00",
    end: "10:00",
    length: "2 h",
  },
  {
    title: "Disco Night",
    color: "#637e57",
    start: "08:00",
    end: "10:00",
    length: "2 h",
  },
  {
    title: "Dumpling Diner",
    color: "#50789d",
    start: "08:00",
    end: "10:30",
    length: "2.5 h",
  },
  {
    title: "Meet will.i.am",
    color: "#6c5d45",
    start: "08:00",
    end: "12:30",
    length: "4.5 h",
  },
];

function Rec(props) {
  const [draggable, setDraggable] = React.useState();

  const setDragElm = React.useCallback((elm) => {
    setDraggable(elm);
  }, []);

  return (
    <div
      ref={setDragElm}
      //   style={{ background: props.data.color }}
      className="external-event-task"
    >
      <Button
        style={{
          fontSize: "small",
          background: props.data.color,
          opacity: "60%",
          margin: "3px",
          //   border: `medium solid ${props.data.color}`,
        }}
        tooltip={props.data.length}
      >
        {props.data.title}
      </Button>
      {/* <Tag value={props.data.length}></Tag> */}
      <Draggable dragData={props.data} element={draggable} />
    </div>
  );
}

function DragDrop({ recs }) {
  return (
    <Card title="Recommendations" style={{ marginTop: "2em" }}>
      <div className="mbsc-col-sm-3">
        {/* aeoutaheount */}
        {recs.map((rec, i) => (
          <Rec key={i} data={rec} />
        ))}
      </div>
    </Card>
  );
}

export default DragDrop;
