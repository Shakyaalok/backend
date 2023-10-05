const signupModel = require('../models/signupModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const singUpUser = async(req, res) => {

    const { name, email, mobile, password } = req.body;




    if (!name) {
        return res.status(500).json('Name is Required')
    }
    if (!email) {
        return res.status(500).json('Email is Required')
    }
    if (!password) {
        return res.status(500).json('Password is Required')
    }
    if (!mobile) {
        return res.status(500).json('Phone Number is Required')
    }

    const existingEmail = await signupModel.findOne({ where: { email } })


    if (existingEmail) {
        return res.status(200).json({
            success: true,
            message: "Already registered please login"
        })
    }

    // hasing
    const saltRounds = 12;
    bcrypt.hash(password, saltRounds, async(err, hash) => {
        console.log(err);

        // then saving
        const user = await signupModel.create({ name, email, mobile, password: hash })
        res.status(201).json({
            success: true,
            message: "Register successfully!",
            user: {
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        })

    })





}

// generate token -- is used for user verification meaning who is using our app
function generateToken(id, name, ispremiumuser) {
    return jwt.sign({ userId: id, name: name, ispremiumuser }, 'secret-key')
}

// login
const login = async(req, res) => {
    const { email, password } = req.body; // from the user or the body
    const user = await signupModel.findOne({ where: { email } });


    if (!user) {
        return res.status(200).json({
            success: false,
            message: 'Email id not regsiter'
        })
    }

    const existingpassword = await signupModel.findOne({ where: { password } }); // in database
    bcrypt.compare(password, existingpassword, function(err, result) {

        if (!err) {
            return res.status(200).json({
                success: false,
                message: 'Creditentials does not match'
            })
        }


        res.status(201).json({
            success: true,
            message: 'Login Successfully!',
            token: generateToken(user.id, user.name, user.ispremiumuser),
            user: {
                name: user.name,
                id: user.id
            }
        })

    })





}


module.exports = { singUpUser, login }