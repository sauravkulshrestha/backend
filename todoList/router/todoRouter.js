const express = require('express');
const {getTask , createTask , deleteTask , updateTask} = require("../../todoList/controller/todoController");
const todoRouter = express.Router();

 todoRouter
.route("/getTask")
.get(getTask);

 todoRouter
.route("/CreateTask")
.post(createTask);


 todoRouter
.route("/deleteTask/:id")
.delete(deleteTask);

 todoRouter
.route("/updateTask/:id")
.patch(updateTask);


 module.exports = todoRouter;
