const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("DB Connected"));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String
});

const Student = mongoose.model("Student", studentSchema);

// POST API
app.post("/register", async (req, res) => {
  const { name, email, course } = req.body;

  const student = new Student({ name, email, course });
  await student.save();

  res.json({ message: "Student Registered Successfully" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});