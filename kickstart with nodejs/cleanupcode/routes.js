const fs = require('fs');



function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;
    const body = [];
    if (url === '/') {
        fs.readFile('message.txt', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            }
            res.write('<html>');
            res.write('<head><title>Enter the message</title></head>');
            res.write(`<body>${data}</body>`)
            res.write(`<body><form action="/message" method="POST">
            <input type="text" name="message">
            <button type="submit">submit</button>
        </form></body>`)
            res.write('</html>');
            return res.end();
        })



    } else if (url === '/message' && method === 'POST') {
        req.on('data', (chunk) => {
            body.push(chunk) //it is an array // it will accumulate the data-1.
        })



        // -2.and once the last chunk come it will come on the end event
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('writefile');
                res.statusCode = 302; // 302 for redirect
                res.setHeader('Location', '/');
                return res.end();
            })
        })
    } else {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<head><title>Enter the message</title></head>');
        res.write(`<body><h1>first page</h1></body>`)
        res.write('</html>');
        res.end();
    }
}

// method-1
// module.exports = requestHandler; //  and we cannot manipulate it with dot like requestHandler.send like that

// method-2
module.exports = {
    handler: requestHandler,
    msg: 'this is 2 method'
}


//method-3
// module.exports.handler = requestHandler;
// module.exports.msg = 'this is 2 method';