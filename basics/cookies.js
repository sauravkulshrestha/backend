const express = require("express");
const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://sauravMars:FOjdwM747DPlhFg3@cluster0.lhqc5t1.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000   ");
});

app.use(express.json());

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Db connection established");
  })
  .catch(function (err) {
    console.log("Error connecting to database");
  });

  const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        require : true
    },
    email: {
        type: 'string',
        require: true,
        unique: true,
    },
    password: {
        type: 'string',
        require: true,
        minLength:6
    },
});

const userModel = mongoose.model("userModel", userSchema); 



const userRouter = express.Router();
app.use("/user", userRouter);

userRouter.get("/getCookies", getCookies);

userRouter.route("/setCookies").get(setCookies);

function getCookies(req, res) {
    
}

function setCookies(req, res) {
     
    res.setHeader('Set-Cookie' , "name = SAURAV");
    res.send("Set-cookies");
}



