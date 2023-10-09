const signupModel = require('../models/signupModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../utils/db')


const singUpUser = async(req, res) => {
    const t = await sequelize.transaction();
    try {
        const { name, email, mobile, password } = req.body;




        if (!name) {
            await t.rollback();
            return res.status(500).json('Name is Required')
        }
        if (!email) {
            await t.rollback();
            return res.status(500).json('Email is Required')
        }
        if (!password) {
            await t.rollback();
            return res.status(500).json('Password is Required')
        }
        if (!mobile) {
            await t.rollback();
            return res.status(500).json('Phone Number is Required')
        }

        const existingEmail = await signupModel.findOne({ where: { email } })


        if (existingEmail) {
            await t.rollback();
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
            const user = await signupModel.create({ name, email, mobile, password: hash }, { transaction: t })
            await t.commit();

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
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error during registration' });
    }





}

// generate token -- is used for user verification meaning who is using our app
function generateToken(id, name, ispremiumuser) {
    return jwt.sign({ userId: id, name: name, ispremiumuser }, 'secret-key')
}





// login
const login = async(req, res) => {
    const t = await sequelize.transaction();
    try {
        const { email, password } = req.body;
        const user = await signupModel.findOne({ where: { email } });


        if (!user) {
            await t.rollback();
            return res.status(200).json({
                success: false,
                message: 'Email id not regsiter'
            })
        }

        const existingpassword = await signupModel.findOne({ where: { password } }); // in database
        bcrypt.compare(password, existingpassword, async function(err, result) {

            if (!err) {
                t.rollback();
                return res.status(200).json({
                    success: false,
                    message: 'Creditentials does not match'
                })
            }

            await t.commit()

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
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error in login' })
    }





}


module.exports = { singUpUser, login }