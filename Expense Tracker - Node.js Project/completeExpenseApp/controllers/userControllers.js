const userModels = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        if (!name) {
            return res.status(200).json({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(200).json({ message: 'Email is required' });
        }
        if (!mobile) {
            return res.status(200).json({ message: 'Mobile is required' });
        }
        if (!password) {
            return res.status(200).json({ message: 'Password is required' });
        }


        const existingEmail = await userModels.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(200).json({ message: 'Email id already exists' })

        }

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const user = await userModels.create({ name, email, mobile, password: hash })
            res.status(201).json({
                user: {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile
                }
            })
        });

    } catch (error) {
        res.status(200).json({ message: 'something went wrong-->backend from user sinup controllers' })
    }

}


const generatewebToken = (id, name, ispremiumuser) => {
    return jwt.sign({ userId: id, name: name, ispremiumuser }, 'secretKey')
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(200).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(200).json({ message: 'Password is required' });
        }


        const user = await userModels.findOne({ where: { email } })
        if (!user) {
            return res.status(200).json({ message: 'credentials does not match' })
        }
        const match = bcrypt.compareSync(password, user.password); // true
        if (!match) {
            return res.status(200).json({ message: 'credentials does not match' })
        }

        return res.status(201).json({ message: 'Login Successffully!', token: generatewebToken(user.id, user.name, user.ispremiumuser) })
    } catch (error) {
        return res.status(200).json({ message: 'something went wrong-->backend from user login controllers' })
    }
}



module.exports = { signup, login }