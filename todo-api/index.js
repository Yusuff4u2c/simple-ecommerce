require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todos = require("./models/Todo");

const app = express();
const PORT = 3000;
app.use(cors());

async function connectToDb() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
connectToDb();

app.use(express.json());

// Get all to-do items
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todos.find();
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new to-do item
app.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todos({
      title: req.body.title,
      completed: req.body.completed,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a to-do item
app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = req.body;
    const todo = await Todos.findByIdAndUpdate(req.params._id, updatedTodo, {
      new: true,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a to-do item
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todos.findByIdAndDelete(req.params.id);
    res.status(204);
  } catch (error) {
    res.status(404).json({ error: "To-Do not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
