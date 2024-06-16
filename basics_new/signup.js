const express = require("express");

const app = express();

app.listen(3000 , () =>{
    console.log("Application listening on port 3000")
});
app.use(express.json());

const authRouther = express.Router();

app.use('/auth' , authRouther);


authRouther
.route('/signup')
.get(getSignup)
.post(postSignup);

function getSignup(req , res){
//   res.send
// res.sendFile(path.join(__dirname, 'templets/signupForm.html'));
res.sendFile("templets/signupForm.html", {root: __dirname});

}
async function  postSignup(req , res){
   let dataObj = await req.body;
   console.log(dataObj);

   res.json({
        message : "Signup successful",
        dataObj : dataObj
   });

}