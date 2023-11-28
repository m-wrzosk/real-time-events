const { WebSocketServer } = require("ws");
const http = require("http");
const uuidv4 = require("uuid").v4;
const lookup = require("coordinate_to_country");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const connections = {};
const intervals = {};
const port = process.env.PORT || 8000;

const handleClose = (uuid) => {
  delete connections[uuid];
  clearInterval(intervals[uuid]);
}

const generateRandomLocation = () => {
  const lat = (Math.random() - 0.5) * 180;
  const lng = (Math.random() - 0.5) * 360;
  return {
    lat,
    lng,
    country: lookup(lat, lng, true)[0]
  }
}

wsServer.on("connection", (connection) => {
  const uuid = uuidv4();
  connections[uuid] = connection;
  connection.on("close", () => handleClose(uuid));

  intervals[uuid] = setInterval(() => {
    const data = JSON.stringify({
      "created_at": (new Date()).toISOString().slice(0, -5) + "Z",
      location: generateRandomLocation()
    });
    connection.send(data);
  }, 200);
});

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});