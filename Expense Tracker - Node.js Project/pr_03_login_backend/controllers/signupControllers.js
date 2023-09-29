const signupModel = require('../models/singupModels');


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


    const user = await signupModel.create({ name, email, mobile, password })
    res.status(201).json({
        success: true,
        message: "Register successfully!",
        user
    })


}

// login
const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await signupModel.findOne({ where: { email } });
    const existingpassword = await signupModel.findOne({ where: { password } });

    if (!user) {
        return res.status(200).json({
            success: false,
            message: 'Email id not regsiter'
        })
    }

    if (!existingpassword) {
        return res.status(200).json({
            success: false,
            message: 'Creditentials does not match'
        })
    }



    res.status(201).json({
        success: true,
        message: 'Login Successfully!',
        user: {
            name: user.name
        }
    })

}


module.exports = { singUpUser, login }