const contactModels = require('../models/contactModels')



const contactVisit = async(req, res) => {
    try {
        const { name, email, mobile, query } = req.body;
        const queryDetails = await contactModels.create({ name, email, mobile, query })
        res.status(201).json({ QueryDetails: queryDetails })
    } catch (error) {
        res.status(200).json({ message: "something went wrong" })
    }
}


// i was thinking a register user should enter his mobile number or name becuase they are already our customer so why we need name of register users
const contact = async(req, res) => {
    const userId = req.user.id;
    // console.log('id----------------------------------------->', userId)
    try {
        const { name, email, mobile, query } = req.body;
        const queryDetails = await contactModels.create({ name, email, mobile, query, userId })
        res.status(201).json(queryDetails)
    } catch (error) {
        console.log(error)
        res.status(200).json({ message: "something went wrong" })
    }
}


module.exports = { contact, contactVisit }