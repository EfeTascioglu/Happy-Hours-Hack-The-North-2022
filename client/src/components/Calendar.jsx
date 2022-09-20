import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Eventcalendar,
  Input,
  Textarea,
  Dropdown,
  Popup,
  setOptions,
  toast,
} from "@mobiscroll/react";
import { useEffect } from "react";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

function Calendar({ socket, checkEvent, plan }) {
  const [events, setEvents] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("New Event");
  const [details, setDetails] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [addEvent, setAddEvent] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);

  const view = React.useMemo(() => {
    return {
      schedule: {
        type: "day",
        size: 3,
        allDay: false,
      },
    };
  }, []);

  const selectedEventsChange = React.useCallback((args) => {
    checkEvent(args);
  }, []);

  const eventUpdateFail = React.useCallback(() => {
    toast({
      message: "Can't create event on this date",
    });
  }, []);

  const onClose = function () {
    setOpen(false);
    const colours = ["#D1CAF2", "#F2D6CA", "#EF7C4B"];
    if (addEvent) {
      socket.emit("createEvent", {
        start: addEvent.start.getTime(),
        end: addEvent.end.getTime() || "",
        allDay: addEvent.allDay,
        imageLink: addEvent.imageLink || null,
        location: eventLocation,
        description: details,
        plan: plan,
        title: title,
        color: addEvent.color
          ? addEvent.color
          : colours[Math.floor(Math.random() * colours.length)],
      });
      setTitle("New Title");
      toast({
        message: "New Event added!",
      });
    }
  };

  useEffect(() => {
    socket.on("newEvent", (data) => {
      data.start = new Date(data.start);
      data.end = new Date(data.end);
      setEvents([...events, data]);
    });
  }, [socket, events]);

  useEffect(() => {
    socket.on("dbEvents", (data) => {
      // console.log(
      //   data.map(({ startdate, enddate, ...rest }) => ({
      //     ...rest,
      //     start: new Date(Number(startdate)),
      //     end: new Date(Number(enddate)),
      //   }))
      // );
      setEvents(
        data.map(({ startdate, enddate, ...rest }) => ({
          ...rest,
          start: new Date(Number(startdate)),
          end: new Date(Number(enddate)),
        }))
      );
    });
  }, [socket, events]);

  const fillDialog = React.useCallback((args) => {
    setAddEvent(args.event);
    setTitle(args.event && args.event.title ? args.event.title : "New Event");
    setDetails(
      args.event && args.event.description ? args.event.description : "Details"
    );
    setEventLocation(
      args.event && args.event.location ? args.event.location : "Location"
    );
    setAnchor(args.target);

    setOpen(true);
  }, []);

  const onEventCreated = React.useCallback(
    (args) => {
      fillDialog(args);
    },
    [fillDialog]
  );

  useEffect(() => {
    // console.log(plan);
    socket.emit("retrieveEvents", {
      plan: plan.value,
    });
  }, [plan]);

  // console.log(events);
  return (
    <div
      className="mbsc-col-sm-9 external-event-calendar"
      style={{ overflow: "scroll", height: "80vh" }}
    >
      {/* {events.length} */}
      <Eventcalendar
        theme="material"
        // themeVariant="dark"
        selectMultipleEvents={true}
        view={view}
        refDate={plan.refDate}
        dragToMove={true}
        externalDrop={true}
        dragToCreate={true}
        dragToResize={true}
        dragTimeStep={15}
        eventDelete={true}
        data={events}
        onSelectedEventsChange={selectedEventsChange}
        onEventCreated={onEventCreated}
        onEventCreateFailed={eventUpdateFail}
        onEventUpdateFailed={eventUpdateFail}
        // onPageLoading={onPageLoading}
      />
      <Popup
        display="anchored"
        width={260}
        contentPadding={false}
        touchUi={false}
        headerText="Create Event"
        buttons={["ok"]}
        isOpen={isOpen}
        onClose={onClose}
        anchor={anchor}
      >
        <div className="mbsc-form-group" style={{ paddingLeft: "2em" }}>
          <span style={{ paddingLeft: "2em" }}>
            <p style={{ marginTop: "-2em" }}>Title</p>
            <InputText
              id="title"
              placeholder={
                addEvent && addEvent.title ? addEvent.title : "New Event"
              }
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>Details</p>
            <InputText
              id="details"
              placeholder={
                addEvent && addEvent.description
                  ? addEvent.description
                  : "Details"
              }
              onChange={(e) => setDetails(e.target.value)}
            />
            <p>Location</p>
            <InputText
              id="eventLocation"
              placeholder={
                addEvent && addEvent.location ? addEvent.location : "Location"
              }
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </span>
        </div>
      </Popup>
    </div>
  );
}

export default Calendar;
