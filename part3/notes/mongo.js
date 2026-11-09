const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
}

const password = process.argv[2];

console.log(process.argv);

const url = `mongodb+srv://officialhassansmail_db_user:${password}@cluster0.rzmmlpj.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/*
const note = new Note({
  content: "JS SUCKS",
  important: false,
});
*/

Note.find({ important: false }).then((result) => {
  result.forEach((note) => console.log(note));
  mongoose.connection.close();
});

/*
note.save().then((result) => {
  console.log("note saved!");
  console.log(result);
  mongoose.connection.close();
});
*/
