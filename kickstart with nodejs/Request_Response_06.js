/*
Q1->Explain the nodejs event driven architecture.
Q2->How can it basically scale to handle 1000 of requests a sec. What helps node JS even though it is single threaded?
Q3->What does process.exit do?
Q4->What does req.url , req.header and req.method contain?


*/

const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url == '/home') {
        res.end('Welcome home');
    } else if (req.url == '/about') {
        res.end(' Welcome to About Us page')
    } else if (req.url == '/node') {
        res.end('Welcome to my Node Js project')
    }
})



server.listen(4000);