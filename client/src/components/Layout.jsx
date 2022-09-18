import React, { useEffect, useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import Calendar from "./Calendar";
import { TabView, TabPanel } from "primereact/tabview";
import DragDrop from "./DragDrop";
import Details from "./Details";
import Comments from "./Comments";
import Chatbox from "./Chatbox";
import { OrderList } from "primereact/orderlist";
import { Divider } from "primereact/divider";

const Layout = ({ socket }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [plans, setPlans] = useState([
    {
      label: "New York",
      value: "NY",
      location: "This is going to be a super fun trip!",
      startingDate: "2022-09-20",
    },
    {
      label: "Rome",
      value: "RM",
      location: "This is going to be a super fun trip!",
      startingDate: "2022-09-21",
    },
    {
      label: "London",
      value: "LDN",
      location: "This is going to be a super fun trip!",
      startingDate: "2022-09-22",
    },
    {
      label: "Istanbul",
      value: "IST",
      location: "This is going to be a super fun trip!",
      startingDate: "2022-09-23",
    },
    {
      label: "Paris",
      value: "PRS",
      location: "This is going to be a super fun trip!",
      startingDate: "2022-09-24",
    },
  ]);
  const [activePlan, setActivePlan] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // }, []);
  const checkEvent = React.useCallback((args) => {
    const last = args.events[args.events.length - 1];
    console.log(last);
    setActiveEvent(last);
  }, []);

  return (
    <Splitter style={{ height: "100vh" }}>
      <SplitterPanel
        className="flex align-items-center justify-content-center"
        size={20}
        minSize={10}
      >
        <h1 style={{ textAlign: "center" }}>Plans</h1>
        {plans.map((plan, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              margin: "20px 10px",
              padding: "5px 20px",
              border: "1px solid black",
              // borderRadius: "25%"
            }}
            onClick={(e) => {
              setActivePlan(plan);
            }}
          >
            {/* <Avatar label="P" size="small" /> */}
            <p>{plan.label}</p>
            <Divider layout="vertical" />
            <p>
              {new Date(plan.startingDate)
                .toDateString()
                .split(" ")
                .slice(1, 3)
                .join(" ")}
            </p>
          </div>
        ))}
      </SplitterPanel>
      <SplitterPanel size={80}>
        <Splitter layout="vertical">
          <SplitterPanel
            className="flex align-items-center justify-content-center"
            size={15}
            style={{ padding: "0 1em", overflow: "hidden", height: "25vh" }}
          >
            <h2>
              {activePlan
                ? activePlan.label
                : "Welcome to your new event planner!"}
            </h2>
            <p>
              {activePlan
                ? new Date(activePlan.startingDate)
                    .toDateString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ") +
                  " - " +
                  new Date(
                    new Date(activePlan.startingDate).getTime() + 3 * 86400000
                  )
                    .toDateString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ") +
                  (activePlan.location ? " * " + activePlan.location : "")
                : ""}
            </p>
          </SplitterPanel>
          <SplitterPanel size={85}>
            <Splitter>
              <SplitterPanel
                className="flex align-items-center justify-content-center"
                size={65}
              >
                {activePlan ? (
                  <Calendar
                    socket={socket}
                    checkEvent={checkEvent}
                    plan={activePlan}
                  />
                ) : (
                  <p style={{ textAlign: "center" }}>
                    Choose a plan to get started
                  </p>
                )}
              </SplitterPanel>
              <SplitterPanel
                className="flex align-items-center justify-content-center"
                size={35}
              >
                {activePlan ? (
                  <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                    style={{ width: "50vh", textAlign: "center" }}
                    // panelContainerStyle={{ width: "100%" }}
                  >
                    <TabPanel header="Details">
                      <Details event={activeEvent} />
                      <Comments socket={socket} />
                      <Chatbox socket={socket} />
                    </TabPanel>
                    <TabPanel header="Suggestions">
                      <DragDrop />
                    </TabPanel>
                  </TabView>
                ) : (
                  ""
                )}
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  );
};

export default Layout;
