const express = require('express');
const path = require('path');


// imports from folder/file
// const connect = require('./util/db') for mongoose
const sequelize = require('./util/db')
const DetailsRoutes = require('./routes/DetailRoute')
const app = express();

// cors
var cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:5000', // Replace with your frontend's localhost URL
};

app.use(cors(corsOptions));

// connect(); for mongoose


app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))
    // console.log(path.join(__dirname, "/public"))

// routes
app.use('/user/v1', DetailsRoutes);

/*
app.get('/', (req, res) => {
    res.send('this is working')
})
*/



// it sync the models to the db by creating the appropriate tables

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(5000, () => {
            console.log('server is listening on the port 5000')
        })
    })
    .catch(err => {
        console.log('err in thee app.js sequelize file', err)
    })