const mongoose = require("mongoose");
const { MONGO_URL } = require("../config.js");
let db = null;

const connectDatabase = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db = mongoose.connection;

  if (!db) {
    throw new Error("Error connecting to database");
  }

  db.on("error", (err) => {
    console.log(err);
    throw new Error("Error connecting to database");
  });

  db.once("open", () => {
    console.log("Database connected");
  });
};

const getConnection = async () => {
  if (db !== null) {
    return db;
  }
  throw new Error("Database not connected");
};

module.exports = {
  connectDatabase,
  getConnection,
};
