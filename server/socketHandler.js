const { WEB_HOST } = require("../config");
const { WeatherData } = require("./generateFiles");
const { syncData } = require("./syncData");
const { syncEndpoint, grabIds } = require("./syncEndpoint");
const ioClient = require("socket.io-client");

const knownHosts = [];
var interval = null;

const getHosts = () => knownHosts;

const addHost = (newHost) => {
  if (newHost !== WEB_HOST && !knownHosts.includes(newHost)) {
    knownHosts.push(newHost);
  }
};

const registerEndpoints = (socket) => {
  socket.on("addHost", (args) => {
    if (args.host !== "" && !knownHosts.includes(args.host)) {
      knownHosts.push(args.host);
    }
  });

  interval = syncEndpoint(socket, knownHosts);

  socket.on("stopSync", () => {
    clearInterval(interval);
    connected = false;
  });

  socket.on("serverConnect", (arg) => {
    socket.emit("knownHosts", knownHosts);
    console.log(`${arg.host} connected!`);
    const client = ioClient.connect(`http://${arg.host}`);
    let syncInterval = setInterval(async () => {
      const data = await grabIds();
      client.emit("sync", {
        list: data.list,
        hosts: knownHosts,
        raw: data.raw,
        source: WEB_HOST,
      });
    }, 5000);
    client.on("disconnect", () => {
      clearInterval(syncInterval);
    });
  });

  syncData(socket, knownHosts, addHost);

  socket.on("sanyi", () => {
    console.log("I received 1");
    socket.emit("clientSanyi", { asd: 2 });
  });

  socket.on("data:sync", () => {
    console.log("I received 2");
    socket.emit("clientSync", { asdas: 232 });
  });

  socket.on("clearDB", async () => {
    await WeatherData.deleteMany({});
    socket.emit("clearedDB");
  });

  socket.on("disconnect", () => {
    clearInterval(interval);
  });
};

module.exports = { registerEndpoints, getHosts };
