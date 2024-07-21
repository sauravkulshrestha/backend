const express = require('express');
const app = express();
const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://sauravMars:FOjdwM747DPlhFg3@cluster0.lhqc5t1.mongodb.net/?retryWrites=true&w=majority";
const todoRouter = require("./router/todoRouter");

  app.listen(3000 , ()=>{
    console.log("listening on port 3000");
  })

  app.use(express.json());

  mongoose
  .connect(db_link)
  .then(function(connection){
     console.log("connection established successfully");
  }).catch(function(error){
    console.log("Error connecting to Mongo");
  });

  // const userRouter = require("./routes/userRoutes");


app.use("/todo", todoRouter);
