const mongoose = require("mongoose");
const { WEB_HOST } = require("../config");

const citySchema = new mongoose.Schema({
  idCity: { type: Number, required: true },
  name: { type: String, required: true },
  coordinates: { type: [Number], required: true },
});

const dataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  city: { type: citySchema, required: true },
  DateTime: { type: String, required: true },
  state: {
    type: String,
    enum: ["clear", "sunny", "overcast", "rain", "thunderstorm", "snow", "fog"],
    required: true,
  },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  wind: {
    speed: { type: Number, required: true },
    direction: {
      type: String,
      enum: ["N", "S", "E", "W", "NE", "NW", "SE", "SW"],
      required: true,
    },
  },
});

const WeatherData = mongoose.model("Data", dataSchema);

const generateData = async (socket) => {
  const id = Math.floor(Math.random() * 1000);
  const idCity = Math.floor(Math.random() * 1000);
  const name = `City ${idCity}`;
  const coordinates = [Math.random() * 180 - 90, Math.random() * 360 - 180];
  const DateTime = new Date().toISOString();
  const state = [
    "clear",
    "sunny",
    "overcast",
    "rain",
    "thunderstorm",
    "snow",
    "fog",
  ][Math.floor(Math.random() * 7)];
  const temperature = Math.random() * 50;
  const humidity = Math.random() * 100;
  const speed = Math.floor(Math.random() * 100);
  const direction = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"][
    Math.floor(Math.random() * 8)
  ];

  const dataModel = {
    id,
    city: { idCity, name, coordinates },
    DateTime,
    state,
    temperature,
    humidity,
    wind: { speed, direction },
  };

  const data = new WeatherData(dataModel);

  try {
    await data.save();
    socket.emit("data:add", {
      data: dataModel,
      source: WEB_HOST,
      uuid: data._id,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { generateData, WeatherData };
