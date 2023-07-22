const express = require("express");
const app = express();

app.listen(3000);
app.use(express.json()); // **ALWAYS use if u r using JSON in POST request


const authRouter = express.Router();

app.use('/auth' , authRouter);

authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

function getSignup(req , res) {
    res.sendFile("templets/signupForm.html", {root: __dirname});
}

function postSignup(req, res) {
    let dataObj = req.body;
    console.log(dataObj);
    res.json({
            message: "Signup successful",
            dataObj : dataObj
        });
}