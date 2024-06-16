const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const app = express();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use(express.json());

const middleWareRouter = express.Router();

// ------------------------------------------- Mongoose DB Implemented----------------------------------------------------------------

const db_link =
  "mongodb+srv://sauravMars:FOjdwM747DPlhFg3@cluster0.lhqc5t1.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Database connection established");
  })
  .catch(function (err) {
    console.log("Database connection Failed: " + err.message);
  });

//----------------------------------------------------------------------------------------------------------------------

app.use("/auth", middleWareRouter);

middleWareRouter.route("/signup")
.get(getUser)
.post(middleware1, postUser);

function getUser(req, res) {
  console.log("get methos success");
  res.sendFile("templets/signupForm.html", { root: __dirname });

  res.sendFile("templets/signupForm.html", { root: __dirname });
}

function middleware1(req, res, next) {
  console.log("Request for the API");
  console.log("hello")
  console.log("helloiuhuhugygyugy")
  console.log("hellddgdgoiuhuhugygyugy")
  let token = req.headers.authorization;
  token = "KuqLbznQYwd69EneBhYxF"; // for enabling postman request support
  token === "KuqLbznQYwd69EneBhYxF" ? next() : res.sendStatus(401); // 401 Unauthorized
}

async function postUser(req, res) {
  let userObj = req.body;

  const createdUser = await USER_MODEL.create(userObj);

  res.json({
    message: "signup successful",
    userObj: createdUser,
  });
  console.log("post methos success");
  console.log(createdUser)
}



const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate : function(){
        return this.password === this.confirmPassword;
    }
  },
  password: {
    type: String,
    required: true,
  },
});


// -------------------hooks ------------------------------------
//  *** V-Imp
// NOTE : Both pre and post hooks need to be added to the schema before registering the model in the file.
userSchema.pre('save', async function(){
    console.log("pre hooks implemented");
    // this keyword contains the req that is being passed for that schema Object

// ----------------------Hashing------------------------
const salt = await bcrypt.genSalt();
let hashedString = await bcrypt.hash(this.password, salt);
this.password = hashedString;
console.log(hashedString);

});

userSchema.post('save', function(){
    console.log("post hooks implemented");
})



//  Model

const USER_MODEL = mongoose.model("USER_MODEL", userSchema);

(async function createUser() {
  let user = [
    {
      name: "Gaurav",
      email: "gautrav@gmail.com",
      password: "1234567",
      confirmPassword: "1234567",
    },
    {
      name: "Vaibhav",
      email: "vaibhav@gmail.com",
      password: "1234567",
      confirmPassword: "1234567",
    },
  ];

  const createdUser = await USER_MODEL.create(user);
  console.log("User Created Successfully" + createdUser);
})();




