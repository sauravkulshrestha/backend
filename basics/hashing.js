const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());
const mongoose = require('mongoose');
const EmailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const router = express.Router();

app.use('/auth', router);

router
    .route('/user')
    .get(getUser)
    .post(postUser);

async function getUser(req, res) {
    
    await users.find().then(function (db) {
        console.log("users found");
        res.json({
            message: "user data fetched successfully",
            users: db
        });
    });


}
function postUser(req, res) {
    let user = req.body;
    createUser(user);
    res.json({
        message: 'Data saved successfully',
        user : req.body
    });
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
});

// pre hooks 
// this function executes before data is being saved into database

userSchema.pre('save' , function () { 
    console.log("pre hooks" + this); 
});

userSchema.pre('save', async function (){ 
    let salt = await bcrypt.genSalt();
    let encyPassword = await bcrypt.hash(this.password, salt);
    console.log(encyPassword);
    this.password = encyPassword; 
    
});

// userSchema.pre('save', function () { 
//     this.confirmPassword = undefined; 
// });


// post hooks 
// this function executes after data is being saved into database

userSchema.post('save', function (doc) { 
    console.log("post hooks" , + doc); 
});


// 3ed Crete model using that Schema



const EncyUsers = mongoose.model('EncyUsers', userSchema);





async function createUser(user) { 
    let data = await EncyUsers.create(user);
}

async function fetchUser() {
    const Allusers = await EncyUsers.find().then(function (db) { 
        console.log("users found");
        console.log(Allusers);
    })
    
}
 



 