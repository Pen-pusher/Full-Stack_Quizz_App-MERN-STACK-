const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connecting app to mongodb

mongoose.connect(
  "mongodb://localhost/quiz",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log("Connected to mongoDB", err ? false : true);
  }
);

//  routes

const indexRoute = require("./../routes/index.js");
const userRoute = require("./../routes/api/users.js");

// user routes
app.use("/", indexRoute);

app.use("/api/v1/users", userRoute);

// error handler

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, err });
});

// start the server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
