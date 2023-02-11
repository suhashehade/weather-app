const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const api = require("../server/routes/api");
const path = require("path");

const MONGO_URI = "mongodb+srv://Suha:988456321_cse@cluster0.p47c2t1.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI)

const PORT = 4040;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../node_modules")));
app.use("/.netlify/functions/server", api);
// app.use('/', api)
app.listen(PORT, function (err, res) {
  console.log(`The server listen on port ${PORT}`);
});

module.exports.handler = serverless(app);

