const signupModel = require('../models/singupModels');


const singUpUser = async(req, res) => {
    try {
        const { name, email, mobile, password } = req.body;




        if (!name) {
            return res.status(500).send({ error: 'Name is Required' })
        }
        if (!email) {
            return res.status(500).send({ error: 'Email is Required' })
        }
        if (!password) {
            return res.status(500).send({ error: 'Password is Required' })
        }
        if (!mobile) {
            return res.status(500).send({ error: 'Phone Number is Required' })
        }


        const user = await signupModel.create({ name, email, mobile, password })
        res.status(201).json(user)



    } catch (error) {
        res.status(500).json({
            message: 'Error in sing Up',
            success: false
        })
    }


}


module.exports = { singUpUser }