const express = require("express");
require("dotenv").config();
const Note = require("./models/note");

const app = express();

const requestLogger = (req, res, next) => {
  console.log("---");
  console.log("Method:", req.method);
  console.log("Path: ", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  console.log("i got called");
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id).then((deletedNote) => {
    response.status(204).end();
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
