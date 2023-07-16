const express = require('express');

const app = express();

// mileware function ,  POST -> frontend --> JSON
app.use(express.json());

app.listen(3000);


let user = {};


// GET --> to get data from BE

app.get('/user', (req, res) => {
    res.send(user);
});


// POST --> to send data to BE

app.post('/addUser', (req, res) => { 
    res.json({
        message: "data recived sucessfully",
        user : req.body
    });
    
    user = req.body;
    console.log(user);

});

// PATCH --> To usdpate the data 

app.patch('/updateUser', (req, res) => { 
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully",
        user : user
    });
    
});


// DELETE --> To Delete the data  

app.delete("/deleteUser", (req, res) => { 

    user = {}
    res.json({
        message: "data deleted succesfully",
        user : user
    });

});


