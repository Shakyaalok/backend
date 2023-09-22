// packages
const express = require('express');
const path = require('path')


// from files/folder
const sequelize = require('./utils/db')
const expenseRoutes = require('./routes/expenseRoutes')



const app = express();


app.use(express.static(path.join(__dirname, "/public")))




// routes
// very important--> we can note this if we get the req.body is undefined
app.use(express.json())
app.use('/expense', expenseRoutes);



sequelize.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('server is listening at the port 4000')
        })
    })
    .catch(() => {
        console.log('erro in creation of the table')
    })