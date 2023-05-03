import generateData from "../util/generateFiles.js";
import { getConnection } from "../util/database.js";

let isGenerating = false;

const initializeEndpoint = (req, res) => {
  const db = getConnection();
  if (!db) {
    return res.send("Database not connected");
  }

  if (isGenerating) {
    return res.send("Already started generating data!");
  }
  isGenerating = true;
  setInterval(generateData, 2000);
  res.send("Starting data generation...");
};
export default initializeEndpoint;
