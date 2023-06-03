const ioClient = require("socket.io-client");
const { WeatherData } = require("./generateFiles");
const { WEB_HOST } = require("../config");

const grabIds = async () => {
  const dataList = await WeatherData.find({});
  return { list: dataList.map((e) => e._id), raw: dataList };
};

const syncronize = (hosts) => {
  if (hosts.length > 0) {
    for (let i = 0; i < hosts.length; i++) {
      const client = ioClient.connect(`http://${hosts[i]}`);
      client.emit("serverConnect", { host: WEB_HOST });

      let syncInterval = setInterval(async () => {
        const data = await grabIds();
        client.emit("sync", {
          list: data.list,
          hosts: hosts,
          raw: data.raw,
          source: WEB_HOST,
        });
      }, 5000);

      client.on("disconnect", () => {
        clearInterval(syncInterval);
      });
    }
  }
};

const syncEndpoint = (socket, hosts) => {
  socket.on("startSync", () => {
    syncronize(hosts);
    return setInterval(() => {
      socket.emit("heartbeat");
    }, 1000);
  });
};

module.exports = {
  syncEndpoint,
  grabIds,
};
