/*
Q1.Explain how does the internet work in your own words.
when the user hits url then the request is sent to the server and the server sent back the response where it was requested and this transactions occured under some protocols like https.


Q2.what is and What are the core modules of node js?
cores modules are a set of built-in modules that come with the nodejs and provide the functionality for the common task and operations in js applications running on the server-side.

like--> http,https,fs,path,os.


Q3.Explain the use of each one of them in detail.

http:-> it is used to launch the server and send the requests.

https:->it is also used to launch the server and send the requests with data-encryption and hence it is more secure than http.

fs:-> it is used to working with the file system allowing us to read and write the files

path:-> it is used to working with file and directory paths

Q4.What are relative path(./ same folder) and absolute path(/)? How to define them?
realtive path provide the path relative to the current directory 
. (dot) to refer to the current directory.
.. (double dot) to refer to the parent directory.
and it does not include the root directory 


Q5.What does createServer do?
it is used to create the http server and it takes two argument request ans response.

Q6.What are anonymous functions?
a function which does not have a name is anonymous functions.

Q7.What do you think server.listens exactly do?Why do we need it?
server.listen() is used because it initializes the server, 
specifies the port it should listen on, and starts accepting 
incoming network connections, allowing your Node.js application
 to respond to HTTP requests.

*/


const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Alok Shakya')
});

server.listen(4000, () => {
    console.log(`server is listening on the http://localhost:4000/`)
}); // it initates the server