const express = require("express");
const app = express();

app.listen(3000);

app.use(express.json());

const middleware = express.Router();

app.use('/auth' , middleware);

middleware.route('/signup')
    .get(getUser)
    .post(middleware1 ,postUser);

function getUser(req, res) {
    res.sendFile("templets/signupForm.html", { root: __dirname }); 
}

function postUser(req, res) { 

    let userObj = req.body

    res.json({
        message : "signup successful", 
        userObj: userObj
    });

    console.log(userObj);
}
function middleware1(req, res, next) {
    let headers = req.headers;

    if (headers.authorization == "KuqLbznQYwd69EneBhYxF")
        next();
    else
        res.sendStatus(401);
}