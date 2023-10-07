const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express();



const sequelize = require('./utils/db');
const singUpRoutes = require('./routes/sinupRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const orderRoutes = require('./routes/orderRoutes');
const premiumFeatureRoutes = require('./routes/premiumFeatureRoutes')
const forgetPasswordRoutes = require('./routes/forgetPasswordRoute')


const expenseModel = require('./models/expenseModels')
const signupModel = require('./models/signupModel')
const OrderModel = require('./models/orderModels')
const forgetPasswordModel = require('./models/forgetPasswordModels')









// middlewares
console.log((path.join(__dirname, 'public', '/login.html')))
app.use(express.static(path.join(__dirname, 'public'))) // static files
app.use(express.json());
app.use('/singup', singUpRoutes);
app.use('/expense', expenseRoutes)
app.use('/order', orderRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', forgetPasswordRoutes)

// assosciations
signupModel.hasMany(expenseModel, { constraints: true, onDelete: 'CASCADE' });
expenseModel.belongsTo(signupModel)

signupModel.hasMany(OrderModel);
OrderModel.belongsTo(signupModel);

signupModel.hasMany(forgetPasswordModel)
forgetPasswordModel.belongsTo(signupModel)



sequelize
    .sync()
    .then((result) => {
        // console.log(result);
        app.listen(4000, () => {
            console.log('server is listening at the port of 4000')
        })
    })
    .catch((err) => console.log(err))