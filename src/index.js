const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.static("public"));
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
const QuestionRoute = require("./../routes/api/question.js");
const adminRoute = require("./../routes/api/admin.js");

// //////
app.use(cors());

app.use("/", indexRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/users", userRoute);

app.use("/api/v1/question", QuestionRoute);

// error handler

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, err });
});

// start the server
app.listen(5000, () => {
  console.log("listening on port 5000");
});
