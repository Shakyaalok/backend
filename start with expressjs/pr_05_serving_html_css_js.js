const path = require('path')
const express = require('express')
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'pr_05_public')))



const adminRoutes = require('./pr_05_routes/admin');
const shopRoutes = require('./pr_05_routes/shop');
const errorRoutes = require('./pr_05_routes/error');
const contactRoutes = require('./pr_05_routes/contact');
const successRoutes = require('./pr_05_routes/success')



app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(contactRoutes);
app.use(successRoutes)
app.use(errorRoutes)




// or we can use here the error page
/*
and we have to use 
const path = require('path)
app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname),'pr_05_views','error.html')
})


*/


app.listen(5000);