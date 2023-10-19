const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan')
    // dotenv configure
require('dotenv').config()



// from files/folder
// routes
const sequelize = require('./utils/db')
const expenseRoutes = require('./routes/expenseRoute');
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const leaderBoadRoutes = require('./routes/leaderBoadRoutes');
const forgetPasswordRoutes = require('./routes/forgetPasswordRoutes')
const downloadRoutes = require('./routes/downloadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paginationRoutes = require('./routes/paginationRoutes')




// models
const expenseModels = require('./models/expenseModels');
const userModels = require('./models/userModels')
const orderModels = require('./models/orderModels');
const fileDownloadModels = require('./models/previousdownloadModels');
const contactModels = require('./models/contactModels')


// middleares

app.use(express.json());
app.use(morgan('combined')) // morgan
app.use(express.static(path.join(__dirname, 'public/Html')))
app.use('/expense', expenseRoutes)
app.use('/user', userRoutes)
app.use('/premium', orderRoutes);
app.use('/leaderboad', leaderBoadRoutes)
app.use('/password', forgetPasswordRoutes)
app.use('/download', downloadRoutes)
app.use('/contact', contactRoutes)
app.use('/pagination', paginationRoutes)






// associations
userModels.hasMany(expenseModels);
expenseModels.belongsTo(userModels)


// order
userModels.hasMany(orderModels);
orderModels.belongsTo(userModels)

// filedownload
userModels.hasMany(fileDownloadModels);
fileDownloadModels.belongsTo(userModels)

// queryDownloads
userModels.hasMany(contactModels);
contactModels.belongsTo(userModels)



sequelize
    .sync()
    .then((result) => {
        app.listen(process.env.PORT, () => {
            console.log(`listening at the port of ${process.env.PORT}`)
        })
    })
    .catch((err) => console.log('error in syncing the tables', err))