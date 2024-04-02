const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_CONNECTION_STRING;
const ConnectDb = async () => {
  mongoose
    .connect(mongoURI)
    .then((response) => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
    });
};

module.exports = ConnectDb;
