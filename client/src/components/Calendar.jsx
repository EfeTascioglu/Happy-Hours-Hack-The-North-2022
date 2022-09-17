import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions, toast } from "@mobiscroll/react";
import { useEffect } from "react";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

function Calendar({ socket }) {
  const [isOpen, setOpen] = React.useState(false);
  const [events, setEvents] = React.useState([]);

  const view = React.useMemo(() => {
    return {
      schedule: {
        type: "day",
        size: 3,
        allDay: false,
      },
    };
  }, []);

  const eventUpdateFail = React.useCallback(() => {
    toast({
      message: "Can't create event on this date",
    });
  }, []);

  const onClose = React.useCallback(() => {
    setOpen(false);
    toast({
      message: "New task added",
    });
  }, []);

  useEffect(() => {
    socket.on("newEvent", (data) => {
      data.start = new Date(data.start);
      data.end = new Date(data.end);
      setEvents([...events, data]);
    });
  }, [socket, events]);

  const onEventCreated = React.useCallback(
    (args) => {
      // console.log(args.event);
      // console.log(events);
      socket.emit("createEvent", {
        start: args.event.start.getTime(),
        end: args.event.end.getTime() || "",
        allDay: args.event.allDay,
        description: "Beach day fun day",
        title: args.event.title,
        color: args.event.color,
      });
      //   setEvents([
      //     ...events,
      //     {
      //       start: args.event.start,
      //       end: args.event.end || "",
      //       allDay: args.event.allDay,
      //       title: args.event.title,
      //       color: args.event.color,
      //     },
      //   ]);
    },
    [socket, events]
  );

  const onPageLoading = React.useCallback((event, inst) => {
    // const year = event.month.getFullYear();
    // const month = event.month.getMonth();
    // const day = event.firstDay.getDate();
    // getJson(
    //   "https://trial.mobiscroll.com/weeklyevents/?year=" +
    //     year +
    //     "&month=" +
    //     month +
    //     "&day=" +
    //     day,
    //   (data) => {
    //     const newEvents = [];
    //     for (const value of data) {
    //       newEvents.push({
    //         start: value.start,
    //         end: value.end || "",
    //         allDay: value.allDay,
    //         title: value.title,
    //         color: value.color,
    //       });
    //     }
    //     setEvents(newEvents);
    //     toast({ message: "New events loaded" });
    //   },
    //   "jsonp"
    // );
  }, []);

  return (
    <div
      className="mbsc-col-sm-9 external-event-calendar"
      style={{ overflow: "scroll", height: "80vh" }}
    >
      <Eventcalendar
        theme="material"
        // themeVariant="dark"
        view={view}
        dragToMove={true}
        externalDrop={true}
        dragToCreate={true}
        dragToResize={true}
        dragTimeStep={15}
        eventDelete={true}
        data={events}
        onEventCreated={onEventCreated}
        onEventCreateFailed={eventUpdateFail}
        onEventUpdateFailed={eventUpdateFail}
        onPageLoading={onPageLoading}
      />
    </div>
  );
}

export default Calendar;
