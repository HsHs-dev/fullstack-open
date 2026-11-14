const express = require("express")
require("dotenv").config()
const Note = require("./models/note")

const app = express()

const requestLogger = (req, res, next) => {
  console.log("---")
  console.log("Method:", req.method)
  console.log("Path: ", req.path)
  console.log("Body:", req.body)
  console.log("---")
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" })
}

const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  } else if (err.name === "ValidationError") {
    return res.json({ error: err.message })
  }

  next(err)
}

app.use(express.static("dist"))
app.use(express.json())
app.use(requestLogger)

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response) => {
  console.log("i got called")
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((deletedNote) => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body

  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        res.json(updatedNote)
      })
    })
    .catch((err) => next(err))
})

app.post("/api/notes", (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
