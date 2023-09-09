const http = require('http');
const express = require('express');

const app = express();


var name = {
    fname: 'alok',
    lname: 'shakya'
}
app.use((req, res, next) => {
    console.log('middleware')
    next(); // if we are not using this next then the next middleware will not run
})

app.use((req, res, next) => {
    console.log('another middleware');
    res.send('<h1>hello</h1>') // it is used to response back to the client and it changes the content-type according to what we are sending --> text/html
        // res.send(name)   // Content-type:application/json
})

const server = http.createServer(app)


server.listen(4000, () => {
    console.log(`listening on the port http://localhost:4000`)
})




/*

Q->what is expressjs and why using it?
Express is a framework and it is used in web application for nodejs. It reduces the line of code which we write in nodejs for doing the task like making the server and it provides routing, middleware, template-engine, json-support and error handling?
Q->what is the middleware?
Middleware helps to communicate between each other like authentication 
or
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions are used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.

Q->what is the use of next?
It executes the next middleware succeeding the current middleware.

Q-> what is send?
it is used to response back to the client and it changes the content-type according to what we are sending --> text/html

Q-> What does app.listen(3000) do behind the scenes ?
It creates the server by createServer and then passing it to the itself and then make sure that it will call.

*/