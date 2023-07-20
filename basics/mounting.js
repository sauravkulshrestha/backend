const express = require('express');

const app = express();

// mileware function ,  POST -> frontend --> JSON
app.use(express.json());


app.listen(3000);



  user = [
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


// mini application
const userRoute = express.Router();

app.use('/user', userRoute);

userRoute
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRoute
    .route("/:id") // -->   "/user/id"
    .get(getUserById);



function getUser(req, res) {
    res.send(user);
};

function postUser(req, res) { 

    user.push(req.body);
    res.json({
        message: "data recived sucessfully",
        users : user
    });


}


function updateUser (req, res) { 
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully",
        user : user
    });
    
}

function deleteUser (req, res) { 

    user = {}
    res.json({
        message: "data deleted succesfully",
        users : user
    });

}

function getUserById (req, res) { 

    const fetchedData = user.filter(obj => obj.id == req.params.id);

    res.json({
        message: "Data fetched successfully",
        data: fetchedData ,
    });
};




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
