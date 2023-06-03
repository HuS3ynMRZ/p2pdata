var socket = io();

const addDataRow = (id, data, source, isNew, isForeign) => {
  const dataRow = document.createElement("tr");
  const dataId = document.createElement("td");
  dataId.textContent = id;

  const CityName = document.createElement("td");
  CityName.textContent = data.city.name;

  const CityID = document.createElement("td");
  CityID.textContent = data.city.idCity;

  const WindSpeed = document.createElement("td");
  WindSpeed.textContent = data.wind.speed;

  const WindDirection = document.createElement("td");
  WindDirection.textContent = data.wind.direction;

  const CityCoordinates = document.createElement("td");
  CityCoordinates.textContent = data.city.coordinates;

  const DateTime = document.createElement("td");
  DateTime.textContent = data.DateTime;

  const State = document.createElement("td");
  State.textContent = data.state;

  const Temperature = document.createElement("td");
  Temperature.textContent = data.temperature.toString().substring(0, 6);

  const Humidity = document.createElement("td");
  Humidity.textContent = data.humidity.toString().substring(0, 6);

  const dataSource = document.createElement("td");
  dataSource.textContent = source;
  dataRow.appendChild(dataId);
  dataRow.appendChild(CityName);
  dataRow.appendChild(CityID);
  dataRow.appendChild(WindSpeed);
  dataRow.appendChild(WindDirection);
  dataRow.appendChild(CityCoordinates);
  dataRow.appendChild(DateTime);
  dataRow.appendChild(State);
  dataRow.appendChild(Temperature);
  dataRow.appendChild(Humidity);
  dataRow.appendChild(dataSource);

  if (isNew && !isForeign) {
    dataRow.classList.add("newData");
  }

  if (isForeign && isNew) {
    dataRow.classList.add("foreign");
  }

  document.getElementById("dataTable").appendChild(dataRow);
};

const addHosts = (hosts) => {
  for (let i = 0; i < hosts.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = hosts[i];
    document.getElementById("hostList").appendChild(listItem);
  }
};

// Add new host button
document.getElementById("sendNewHost").addEventListener("click", () => {
  const newHost = document.getElementById("addHost").value;
  document.getElementById("addHost").value = null;

  const listItem = document.createElement("li");
  listItem.textContent = newHost;

  document.getElementById("hostList").appendChild(listItem);
  socket.emit("addHost", { host: newHost });
});

// Sync start / stop button
document.getElementById("sync").addEventListener("click", () => {
  connectedHandler({ forcedConnect: false });
});

document.getElementById("clearDB").addEventListener("click", () => {
  socket.emit("clearDB");
});

socket.on("heartbeat", () => {
  // console.log("I'm online");
});

socket.on("connected", () => {
  connectedHandler({ forcedConnect: true });
});

socket.on("data:add", (args) => {
  addDataRow(args.uuid, args.data, args.source, true, false);
});

socket.on("data:sync", (args) => {
  console.log("FOREIGN");
  console.log(args);
  addDataRow(args.uuid, args.data, args.source, true, true);
});

socket.on("data:init", (args) => {
  for (let i = 0; i < args.dataList.length; i++) {
    const data = args.dataList[i];
    const uuid = args.dataList[i]._id;
    delete args.dataList[i]._id;
    addDataRow(uuid, data, args.source, false, false);
  }

  addHosts(args.hosts);
});

const connectedHandler = ({ forcedConnect }) => {
  const el = document.getElementById("sync");
  if (forcedConnect) {
    el.classList.add("started");
    return;
  }
  if (!el.classList.contains("started")) {
    socket.emit("startSync");
    el.textContent = "Synchronized"
    el.classList.add("started");
    return;
  }
  socket.emit("stopSync");
  el.textContent = "Synchronize"
  el.classList.remove("started");
};

socket.on("clearedDB", () => {
  const table = document.getElementById("dataTable");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
});

socket.on("knownHosts", (args) => {
  console.log(args);
});

socket.on("clientSanyi", () => {
  console.log("sanyi");
});

socket.on("clientSync", () => {
  console.log("Im captured");
});
