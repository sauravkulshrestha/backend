const http = require('http');
const fs = require('fs');

const server = http.createServer((req , res) => { 
    console.log("Request has been made from browser to server");

    // console.log(req.method, req.url);

    let path = "templets/"
    console.log(req.url);

    switch (req.url) {
        case  '/':
            path += "file.html"
            res.statusCode = 200
            break;
        
        case '/about':
            path += "about.html"
            res.statusCode = 200;
            break;
        
        case '/about-me':
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
    
        default:
            path += "404.html"
            res.statusCode = 404;

    }

    res.setHeader('Content-Type', 'text/html');

    // res.write used for writing the response in DOM

    // res.write('<h1>Hello world :-) </h1>');
    // res.write(`<h2>First express program</h2>`);
    // res.end(); // end it writen to end the code

    fs.readFile(path , (err, fileData) => {
        if (err) {
            console.log(err);
        } else {
            res.write(fileData);
        }
     })
});
// 
// server.listen Parameters (portNumber , hostName , callback function)

server.listen(3000, 'localhost', () => { 

    console.log("Starting the server at http://localhost:3000");
});