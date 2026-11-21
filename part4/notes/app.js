const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleWare = require("./utils/middleware");
const notesRouter = require("./controlers/notes");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then((result) => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting to mongoDB", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());

app.use("/api/notes", notesRouter);

app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorHandler);
app.use(middleWare.requestLogger);

module.exports = app;
