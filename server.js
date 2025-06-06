const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, "tasks.json");

app.use(express.json());
app.use(express.static(__dirname)); // Serves index.html

const readTasks = () => JSON.parse(fs.readFileSync(FILE_PATH));
const writeTasks = (tasks) =>
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));

// Routes
app.get("/api/tasks", (req, res) => {
  res.json(readTasks());
});

app.post("/api/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title || "Untitled Task",
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.completed = true;
  writeTasks(tasks);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const updated = tasks.filter((t) => t.id !== parseInt(req.params.id));
  writeTasks(updated);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
