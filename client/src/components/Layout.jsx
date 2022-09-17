import React, { useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import Calendar from "./Calendar";
import { TabView, TabPanel } from "primereact/tabview";
import DragDrop from "./DragDrop";
import Details from "./Details";
import Comments from "./Comments";

const Layout = ({ socket }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Splitter style={{ height: "100vh" }}>
      <SplitterPanel
        className="flex align-items-center justify-content-center"
        size={20}
        minSize={10}
      >
        Panel 1
      </SplitterPanel>
      <SplitterPanel size={80}>
        <Splitter layout="vertical">
          <SplitterPanel
            className="flex align-items-center justify-content-center"
            size={15}
            style={{ padding: "0 1em", overflow: "hidden", height: "25vh" }}
          >
            <h3>Organizer Retreat</h3>
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
                size={60}
              >
                <Calendar socket={socket} />
              </SplitterPanel>
              <SplitterPanel
                className="flex align-items-center justify-content-center"
                size={40}
              >
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                  style={{ width: "80vh", textAlign: "center" }}
                  // panelContainerStyle={{ width: "100%" }}
                >
                  <TabPanel header="Details & Discussion">
                    <Details />
                    <Comments />
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
