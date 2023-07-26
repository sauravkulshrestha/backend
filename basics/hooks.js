const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());
const mongoose = require('mongoose');
const EmailValidator = require('email-validator');

const router = express.Router();

app.use('/auth', router);

router
    .route('/user')
    .get(getUser)
    .post(postUser);

function getUser(req, res) {
    
    let allUser =  fetchUser();
    res.json({
        message: "user data fetched successfully",
        users : allUser
    });

}
function postUser(req, res) {
    let user = req.body;
    createUser(user);
    res.json({
        message: 'Data feyched successfully',
        user : req.body
    });

    console.log('user creted successfully');

}
    
const db_link = 'mongodb+srv://sauravMars:FOjdwM747DPlhFg3@cluster0.lhqc5t1.mongodb.net/?retryWrites=true&w=majority';


// 1st connect with MongoDB

mongoose.connect(db_link)
    .then(function (db) {
        console.log('Db connection established');
    })
    .catch(function (err) {
        console.log("Error connecting to database");
    })

// 2nd create a Schema 

const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        require : true
    },
    email: {
        type: 'string',
        require: true,
        unique: true,
        validate: function () {    
           return EmailValidator.validate(this.email)
        }
    },
    password: {
        type: 'string',
        require: true,
        minLength:6
    },
    confirmPassword: {
        type: 'string',
        require: true,
        minLength: 6 , 
        validate: function () { 
          return  this.password == this.confirmPassword
        }
    }
});

// pre hooks 
// this function executes before data is being saved into database

userSchema.pre('save' , function () { 
    console.log("pre hooks" + this); 
});

userSchema.pre('save', function () { 
    this.confirmPassword = undefined; 
});


// post hooks 
// this function executes after data is being saved into database

userSchema.post('save', function (doc) { 
    console.log("post hooks" , + doc); 
});


// 3ed Crete model using that Schema



const users = mongoose.model('user', userSchema);





async function createUser(user) { 
    let data = await users.create(user);
    console.log(data);
}

async function fetchUser() {
    let Allusers = await users.find().then(function (db) { 
        console.log("users found");
    })
    
}
 



 