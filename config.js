const DB_NAME =
  typeof process.env.DB_NAME === "undefined" ? "p2p-db" : process.env.DB_NAME;
const SOURCE_HOST =
  typeof process.env.HOST === "undefined" ? "127.0.0.1" : process.env.HOST;
const SOURCE_PORT =
  typeof process.env.PORT === "undefined" ? "localhost" : process.env.PORT;
const MONGO_URL = `mongodb://${SOURCE_HOST}:27017/${DB_NAME}`;
const SOURCE = `${SOURCE_HOST}:${SOURCE_PORT}`;
const WEB_HOST =
  process.env.WEB_HOST === "undefined"
    ? "127.0.0.1:3000"
    : `${process.env.WEB_HOST}:${SOURCE_PORT}`;
module.exports = {
  MONGO_URL,
  SOURCE_HOST,
  SOURCE_PORT,
  SOURCE,
  WEB_HOST
};
