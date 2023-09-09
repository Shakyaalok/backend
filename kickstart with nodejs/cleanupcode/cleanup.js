const http = require('http');

//import
const route = require('./routes');
console.log(route.msg)
    // const server = http.createServer(route); for method-1
const server = http.createServer(route.handler); // for method-2

server.listen(4000, () => {
    console.log(`listening on the port http://localhost:4000`)
})