const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

let tasks = [];
let currentId = 1;

app.get("/tasks", async (req, res) => {
  try {
    res.status(200).send(tasks);
  } catch (err) {
    next(err);
  }
});

app.post("/tasks", async (req, res, next) => {
  try {
    const { task } = req.body;

    // check if the task title is empty

    if (!task || task.trim() === "") {
      const error = new Error("Task tittle is required");
      error.status = 400;
      throw error;
    }

    // add id based on the last number on currentId++
    const newTask = {
      id: currentId++,
      task,
    };
    // add new task on tasks array
    tasks.push(newTask);

    res.status(201).send({ newTask });
  } catch (err) {
    next(err);
  }
});

app.put("/tasks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    // check if the task title is empty
    if (!task || task.trim() === "") {
      const error = new Error("Task title is required");
      error.status = 400;
      throw error;
    }

    // search the task in tasks array
    const taskIndex = tasks.findIndex((t) => t.id === Number(id));
    if (taskIndex === -1) {
      // if this task does not exist return a 404 error
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }
    // change the task content
    tasks[taskIndex].task = task;

    res.status(200).send(tasks[taskIndex]);
  } catch (err) {
    // All errors are sent to middlaware
    next(err);
  }
});

app.delete("/tasks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // serch the task in task array
    const taskIndex = tasks.findIndex((t) => t.id === Number(id));
    // if this task does not exist return a 404 error
    if (taskIndex === -1) {
      const error = new Error("Task not found");

      error.status = 404;

      throw error;
    }
    // delete the task from tasks array
    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).send({
      message: "Task deleted",
      deletedTask,
    });
  } catch (err) {
    next(err);
  }
});

// middleware that deals with global errors
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).send({
    error: err.name || "Internal Server Error",
    message: err.message || "Algo deu errado no servidor",
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
