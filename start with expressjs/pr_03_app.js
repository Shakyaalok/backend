const express = require('express');


const adminRoutes = require('./pr_03_routes/admin')
const shopRoutes = require('./pr_03_routes/shop')


const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use((req, res, next) => {
    res.status(404).send(`<h1>Not found!</h1>`)
})



app.listen(3000);