import mongoose from "mongoose";
import { MONGO_URL } from "../config.js";
let db = null;

export const connectDatabase = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db = mongoose.connection;

  if(!db){
    throw  new Error("Error connecting to database");
  }

  db.on("error", (err) => {
    console.log(err);
    throw new Error("Error connecting to database");
  });

  db.once("open", () => {
    console.log("Database connected");
  });
};

export const getConnection = async () => {
  if (db !== null) {
    return db;
  }
  throw new Error("Database not connected");
};