require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { registerEndpoints } = require("./server/socketHandler");
const { connectDatabase } = require("./server/connectDatabase");
const { initializeEndpoint } = require("./server/initializeEndpoint");
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(__dirname.replace("server", "client") + "/index.html");
});

(async () => {
  await connectDatabase();
})();

io.on("connection", (socket) => {
  console.log("connected");
  initializeEndpoint(socket);
  registerEndpoints(socket);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
