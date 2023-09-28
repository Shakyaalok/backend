const express = require('express');
const path = require('path')
const app = express();

// from files/folder
const sequelize = require('./utils/db');
const singUpRoutes = require('./routes/sinupRoutes')









// middlewares
app.use(express.static(path.join(__dirname, 'public'))) // static files
app.use(express.json());
app.use('/singup', singUpRoutes)


app.get('/', (req, res) => {
    res.send('this is working')
})



sequelize
    .sync()
    .then((result) => {
        // console.log(result);
        app.listen(4000, () => {
            console.log('server is listening at the port of 4000')
        })
    })
    .catch((err) => console.log(err))