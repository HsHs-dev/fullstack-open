const requestLogger = (req, res, next) => {
  console.log("---");
  console.log("Method:", req.method);
  console.log("Path: ", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.json({ error: err.message });
  }

  next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
