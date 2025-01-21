import express from "express";
const app = express();
import "./database.js";
const port = process.env.PORT || 5001;
import cors from "cors";
import { Todo } from "./models/index.js";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://todo-with-mongodb.surge.sh/"],
    allowedHeaders: ["Content-Type"],
  })
);
//yaha sare todos store honge
app.get("/api/v1/todos", async (req, res) => {
  const todos = await Todo.find();
  const message = !todos.length ? "todos empty" : "here your todos";

  res.send({ data: todos, message: message });
});

// yaha ek todo milega
app.post("/api/v1/todo", async (req, res) => {
  try {
    const obj = {
      todoContent: req.body.todo,
      ip: req.ip,
    };
    const response = await Todo.create(obj);
    console.log("response", response);
    res.send({ message: "Todo added successfully", data: obj });
  } catch (error) {
    console.log("error", error);
  }
});

//yaha ek todo update hoga
app.patch("/api/v1/todo/:id", async (req, res) => {
  const id = req.params.id; //id of todo to be updated
  const result = await Todo.findByIdAndUpdate(id, {
    todoContent: req.body.todoContent,
  });

  console.log("result=>", result);  
  
  if (result) {
    res.status(201).send({
      data: { todoContent: req.body.todoContent, id: id },
      message: "todo updated successfully!",
    });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

//yaha ek todo delete hoga

app.delete("/api/v1/todo/:id", async  (req, res) => {
  const id = req.params.id;
  const result = await Todo.findByIdAndDelete(id);
  if (result) {
    res.status(201).send({
      message: "todo deleted successfully!",
    });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

app.use((req, res) => {
  res.status(404).send("404: Page not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
