const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express();

// from files/folder
const sequelize = require('./utils/db');
const singUpRoutes = require('./routes/sinupRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const expenseModel = require('./models/expenseModels')
const signupModel = require('./models/singupModels')








// middlewares
console.log((path.join(__dirname, 'public', '/login.html')))
app.use(express.static(path.join(__dirname, 'public'))) // static files
app.use(express.json());
app.use('/singup', singUpRoutes);
app.use('/expense', expenseRoutes)

// assosciations
signupModel.hasMany(expenseModel, { constraints: true, onDelete: 'CASCADE' });
expenseModel.belongsTo(signupModel)




sequelize
    .sync()
    .then((result) => {
        // console.log(result);
        app.listen(4000, () => {
            console.log('server is listening at the port of 4000')
        })
    })
    .catch((err) => console.log(err))