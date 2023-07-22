const express = require('express');
const app = express();
app.listen(3000);

users = [
    {
        "id": 1,
        "name": "John",
        "position" : "APE"
    },
    {
        "id": 2,
        "name": "Wick",
        "position" : "PE"
    },
    {
        "id": 3,
        "name": "Cena",
        "position" : "SPE"
    },
    {
        "id": 4,
        "name": "Saurav",
        "position" : "TL"
    },
    {
        "id": 5,
        "name": "Kumar",
        "position" : "EM"
    },
    {
        "id": 6,
        "name": "Kulshrestha",
        "position" : "SEM"
    },
];


// getting data using paramets (or params) -->
app.get('/getUser/:id', (req, res) => { 

    const fetchedData = users.filter(obj => obj.id == req.params.id);

    res.json({
        message: "Data fetched successfully",
        data: fetchedData ,
    });
});


// getting data using querry -->
app.get("/getUserThroughQuerry", (req, res) => { 

    const fetchedData = users.filter(obj => obj.id == req.query.id && obj.name == req.query.name);

    res.json({
        message: "Data fetched successfully",
        data: fetchedData ,
    });

});

// implementing both query and params

app.get("/getUserThroughQuerryAndParams/:id", (req , res) => { 
       
    const fetchedData = users.filter(obj => obj.id == req.params.id && obj.name == req.query.name);

    res.json({
        message: "Data fetched successfully",
        data : fetchedData 
    });

});

