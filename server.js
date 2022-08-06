const express = require("express");
const mongoose = require("mongoose");
const api = require("./server/routes/api");
const path = require("path");

mongoose.connect("mongodb://localhost/weather-db", { useNewUrlParser: true });

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

app.listen(PORT, function (err, res) {
  console.log(`The server listen on port ${PORT}`);
});
