const { WeatherData } = require("./generateFiles");
const { grabIds } = require("./syncEndpoint");

const parseIds = (ids) => {
  return ids.map((e) => {
    return e.toString();
  });
};

const syncData = (socket, knownHosts, addHost) => {
  socket.on("sync", async (args) => {
    addHost(args.source);
    const ids = args.list;
    const hosts = args.hosts;
    const raw = args.raw;

    for (let i = 0; i < hosts.length; i++) {
      if (!knownHosts.includes(hosts[i])) {
        addHost(hosts[i]);
      }
    }

    const myDataIds = await grabIds();
    const myParsed = parseIds(myDataIds.list);
    for (let i = 0; i < ids.length; i++) {
      if (!myParsed.includes(ids[i].toString())) {
        const newData = raw.find((e) => e._id === ids[i]);
        try {
          const dataPoint = new WeatherData(newData);
          await dataPoint.save();
          socket.emit("data:sync", {
            data: newData,
            source: args.source,
            uuid: dataPoint._id,
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
  socket.on("sync", () => {
    socket.emit("sanyi");
  });
};
module.exports = { syncData };
