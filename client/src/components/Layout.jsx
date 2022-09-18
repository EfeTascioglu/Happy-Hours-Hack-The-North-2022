import React, { useEffect, useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import Calendar from "./Calendar";
import { TabView, TabPanel } from "primereact/tabview";
import DragDrop from "./DragDrop";
import Details from "./Details";
import Comments from "./Comments";
import Chatbox from "./Chatbox";
import { OrderList } from "primereact/orderlist";

const Layout = ({ socket }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [plans, setPlans] = useState([
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ]);
  const [activePlan, setActivePlan] = useState(null);

  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // }, []);

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
              console.log(plan.label);
              setActivePlan(plan);
            }}
          >
            {/* <Avatar label="P" size="small" /> */}
            <p>{plan.label}</p>
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
            <h3>
              {activePlan ? activePlan.label : "Choose a plan to get started"}
            </h3>
            <p>
              This September, 1000+ hackers joined from all around the world for
              a hackathon like no other. We really put on a show, we deserve a
              vacation...
            </p>
          </SplitterPanel>
          <SplitterPanel size={85}>
            <Splitter>
              <SplitterPanel
                className="flex align-items-center justify-content-center"
                size={80}
              >
                <Calendar socket={socket} />
              </SplitterPanel>
              <SplitterPanel
                className="flex align-items-center justify-content-center"
                size={20}
              >
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                  style={{ width: "50vh", textAlign: "center" }}
                  // panelContainerStyle={{ width: "100%" }}
                >
                  <TabPanel header="Details">
                    <Details />
                    <Comments socket={socket} />
                    <Chatbox socket={socket} />
                  </TabPanel>
                  <TabPanel header="Suggestions">
                    <DragDrop />
                  </TabPanel>
                </TabView>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  );
};

export default Layout;
