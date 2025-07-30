import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ status: "pending" });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// Add a Todo
router.post("/add", async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

// Mark todo as completed
router.put("/:id/status", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res
      .status(200)
      .json({ message: "Status updated to complete", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

// Update a Todo
router.put("/:id", async (req, res) => {
  try {
    const { text } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

export default router;
