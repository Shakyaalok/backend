const jwt = require('jsonwebtoken');
const signupModel = require('../models/singupModels');



const authenticate = (req, res, next) => {


    try {
        const token = req.header('Authorization');
        console.log("Tocken==>", token)
        if (!token) {
            return res.status(401).json({ message: 'JWT token is missing' });
        }
        console.log(token);
        const user = jwt.verify(token, 'secret-key');
        console.log('--------->', user.userId);
        signupModel.findByPk(user.userId).then(user => {
            req.user = user;
            console.log('--------->', req.user);
            next();
        })



    } catch (error) {
        console.log(error)
    }
}


module.exports = { authenticate }