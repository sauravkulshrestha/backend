const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3000);
app.use(express.json()); // **ALWAYS use if u r using JSON in POST request
const authRouter = express.Router();

app.use('/auth', authRouter);

authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);


async function getSignup(req, res) {
    // res.sendFile("templets/signupForm.html", { root: __dirname });
    let allUser = await userModel.findOne({name : "Vimal"});
    res.json({
        message: "Data returned successfully",
        users : allUser
    });
}

function postSignup(req, res) {
    let dataObj = req.body;
    createUser(dataObj); 
    res.json({
        message: "Signup successful",
        dataObj: dataObj
    });
}
const db_link = 'mongodb+srv://sauravMars:FOjdwM747DPlhFg3@cluster0.lhqc5t1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
console.log(err);
    });
// 1st Cretation of Schema 
const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        require: true,
    },
    email: {
        type: 'string',
        require: true,
        unique : true
    },
    password: {
        type: 'string',
        require: true,
        unique : true,
        minLength:8
    },
});

// 2nd create model using that schema

const userModel = mongoose.model("userModel" , userSchema);

// create a new user --> C
async function createUser(user) {
    let data = await userModel.create(user);
    console.log(data);
};



