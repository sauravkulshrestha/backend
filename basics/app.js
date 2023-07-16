const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("listening on port 3000...");
});

app.get('/', function (req, res) { 
    // res.send("<h1>hello express world!</h1>");
    res.sendFile("templets/file.html", { root:__dirname});
})

app.get('/about', function (req, res) { 
    // res.send("<h1>hello express world!</h1>");
    res.sendFile("templets/about.html", {root:__dirname});
})

// redirects

app.get("/about-us" , (req , res) => {
    res.redirect('/about');
});

// 404 page 

app.use((req, res) => {
    // res.status(404); 
    res.status(404).sendFile('templets/404.html', { root: __dirname }); // status code send by chaing method
})