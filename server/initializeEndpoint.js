const { generateData, WeatherData } = require("../server/generateFiles.js");
const { getConnection } = require("../server/connectDatabase.js");
const { WEB_HOST } = require("../config.js");
const { getHosts } = require("./socketHandler.js");

let isGenerating = false;

const initializeEndpoint = async (socket) => {
  const db = getConnection();
  if (!db) {
    return res.send("Database not connected");
  }

  const currentData = await WeatherData.find({});
  if (currentData.length > 0) {
    socket.emit("data:init", {
      dataList: currentData,
      source: WEB_HOST,
      hosts: getHosts(),
    });
  }

  if (isGenerating) {
    console.log("Already started generating data!");
    return;
  }
  isGenerating = true;
  const generateInterval = setInterval(() => {
    generateData(socket);
  }, 10000);

  socket.on("disconnect", () => {
    isGenerating = false;
    clearInterval(generateInterval);
  });
};
module.exports = { initializeEndpoint };
