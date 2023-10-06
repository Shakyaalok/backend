const Sib = require('sib-api-v3-sdk') // for mail
require('dotenv').config();



//for mail--forget password
const forgetPassword = (req, res) => {
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: 'shakyaalok99@gmail.com'
    }

    const recievers = [{
        email: 'shakyaamit878@gmail.com'
    }]

    tranEmailApi.sendTransacEmail({
            sender,
            to: recievers,
            subject: 'Forget Password',
            textContent: `click here to reset your password `
        })
        .then(console.log)
        .catch(console.log)

    res.status(200).json({ message: 'Mail has been sent successfully!' })

}



module.exports = { forgetPassword }