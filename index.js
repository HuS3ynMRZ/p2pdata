import express from "express";
import mongoose from "mongoose";
import initializeEndpoint from "./endpoints/initialize.js";
import { connectDatabase } from "./util/database.js";

const app = express();
const port = 3000;

let isGenerating = false;

app.get("/initialize", initializeEndpoint);

app.get("/synchronize", (req, res) => {
  res.send("Synchronizing...");
});

console.log("launching server");
const server = app.listen(port, "0.0.0.0", async () => {
  console.log(`Server listening at http://localhost:${port}`);

  await connectDatabase();
});

server.on("close", () => {
  isGenerating = false;
  mongoose.connection.close();
  console.log("Closing up");
});
