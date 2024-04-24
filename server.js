require("dotenv").config();
const express = require("express");
const http = require("http");
const so = require("socket.io");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConfig");
const binValidator = require("./middleware/binValidator");
const mailController = require("./middleware/notificationMiddleware");
const binData = require("./Models/binData");
const router = express.Router();

const PORT = 8010 || process.env.PORT;

const server = http.createServer(app);
const io = so(server);

app.use(cors({ origin: "*" }));

dbConnect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hi i'm ready to proceed" });
});
app.use("/app", require("./Routes/applicationRoute"));

const fillBin = async (req, res) => {
  const { fill } = req.body;
  const { bin_id } = req.headers;
  const updatedBin = await binData.updateOne({ bin_id }, { fill });
  if (updatedBin.acknowledged) {
    res.status(200).send({ message: "fill updated" });
    io.emit("fill", { bin_id: bin_id, fill: fill });
    return 0;
  }
  res.status(400).send();
};
app.post("/device/fill", binValidator, mailController, fillBin);
app.use("*", (req, res) => {
  res.status(404).send("Not found");
});
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log("database Connection error", err);
});
