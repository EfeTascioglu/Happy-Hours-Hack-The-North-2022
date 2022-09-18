const express = require("express");
const app = express();
const PORT = 4000;
const { Client } = require("pg");
const pass =
  "postgresql://andrew:KJLeSbMHRc4oTVeb_lAuNA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dorange-quagga-5049";
const client = new Client(pass);
// console.log(process.env.DATABASE_URL);
// console.log(client);

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  // console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  socket.on("message", (data) => {
    socketIO.emit("messagePush", data);
  });
  socket.on("retrieveEvents", (data) => {
    // console.log("WHAT", data);
    (async () => {
      try {
        const results = await client.query(
          `SELECT * FROM events WHERE plan='${data.plan}';`
        );
        // console.log(results.rows);
        // console.log(client);
        socket.emit("dbEvents", results.rows);
      } catch (err) {
        console.error("error executing query:", err);
      }
    })();
  });
  socket.on("createEvent", (data) => {
    // console.log(data);
    socketIO.emit("newEvent", data);

    (async () => {
      try {
        console.log(
          `INSERT INTO events (plan, title, description, location, color, startDate, endDate) VALUES ('${data.plan.label}','${data.title}','${data.description}', '${data.location}', '${data.color}', ${data.start}, ${data.end});`
        );
        await client.query(
          `INSERT INTO events (plan, title, description, location, color, startDate, endDate) VALUES ('${data.plan.label}','${data.title}','${data.description}', '${data.location}', '${data.color}', ${data.start}, ${data.end});`
        );
        // console.log(results.rows);
      } catch (err) {
        console.error("error executing query:", err);
      }
    })();
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  client.connect();
  console.log(`Server listening on ${PORT}`);
});
