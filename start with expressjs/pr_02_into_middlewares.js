const express = require('express');

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/add-product', (req, res, next) => {
    res.send(`<body>
    <form action="/product" method="POST">
     <input type="text" name="title" placeholder = "Entet the product">
     <input type="text" name="size" placeholder = "Entet the size">
     <button type="submit">submit</button>
     
    </form>
 </body>`)
})


app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    res.send('<h1>this is home page</h1>')
})



app.listen(3000);