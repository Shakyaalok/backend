const Sib = require('sib-api-v3-sdk') // for mail
const uuid = require('uuid');
const bcrypt = require('bcrypt');

require('dotenv').config();
// const client = Sib.ApiClient.instance
// const apiKey = client.authentications['api-key']
// apiKey.apiKey = process.env.API_KEY


const signupModel = require('../models/signupModel');
const forgetPasswordModel = require('../models/forgetPasswordModels');
const { decrypt } = require('dotenv');





//for mail--forget password
const forgetPassword = async(req, res) => {
    const { email } = req.body;
    // need to check from db
    try {
        const users = await signupModel.findOne({ where: { email }, raw: true });
        if (!users) {
            return res.status(400).json({ message: 'email not found' })
        }
        console.log("fUsers", users);
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.API_KEY

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'shakyaalok99@gmail.com'
        }

        const recievers = [{
            email: users.email
        }]

        // for the encryption of the userId
        const UserId = uuid.v4(); // backend will automatically read it no need to worry
        console.log(UserId)

        tranEmailApi.sendTransacEmail({
                sender,
                to: recievers,
                subject: 'Forget Password',
                textContent: `<a href="http://localhost:4000/forgetpwd.html?id=${UserId}">click here to reset your password</a>`
            })
            .then(console.log)
            .catch(console.log)

        res.status(200).json({ message: 'Mail has been sent successfully!' })
    } catch (err) {
        res.status(400).json({ message: 'an error occerd!', error_msg: err })
    }

}




// const resetpassword = (req, res) => {
//     const id = req.params.id;
//     forgetPasswordModel.findOne({ where: { id } }).then(forgotpasswordrequest => {
//         if (forgotpasswordrequest) {
//             forgotpasswordrequest.update({ active: false });
//             res.status(200).send(`<html>
//                                     <script>
//                                         function formsubmitted(e){
//                                             e.preventDefault();
//                                             console.log('called')
//                                         }
//                                     </script>

//                                     <form action="/password/updatepassword/${id}" method="get">
//                                         <label for="newpassword">Enter New password</label>
//                                         <input name="newpassword" type="password" required></input>
//                                         <button>reset password</button>
//                                     </form>
//                                 </html>`)
//             res.end()

//         }
//     })
// }



const updatepassword = async(req, res) => {

    try {
        const { id } = req.params;
        const { newpassword } = req.query; // url will be like this is terms of query--> http://localhost:4000/password/updatepassword/2?newpassword=Strong@123412131

        const user = await signupModel.findOne({ where: id });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found with this mail id' })
        }

        const saltRounds = 12;
        bcrypt.hash(newpassword, saltRounds, async(err, hash) => {
            user.password = hash
            user.save();
            res.status(200).json({ success: true, message: 'successfully update the password' })
        })



    } catch (error) {
        res.status(400).json({ success: true, message: 'error occured' })
    }


    // params and query
    // try {
    //     const { newpassword } = req.query;
    //     const { resetpasswordid } = req.params;
    //     console.log(object)
    //         // decript
    //         //const decriptedname = encrypt(resetpasswordid, process.env.ENCRIPTION_KEY);
    //         //depfsdakf809lasdkfl
    //         //const realName =decrypt(name, process.env.ENCRIPTION_KEY);
    //     const user = await signupModel.findOne({ where: { id: resetpasswordid }, raw: true })
    //     if (!user) {
    //         return res.status(404).json({ error: 'No user Exists', success: false })
    //     }

    //     const saltRounds = 10;
    //     bcrypt.genSalt(saltRounds, function(err, salt) {
    //         if (err) {
    //             console.log(err);
    //             throw new Error(err);
    //             //return res.status(404).json({ error: 'No user Exists', success: false })
    //         }
    //         bcrypt.hash(newpassword, salt, function(err, hash) {
    //             // Store hash in your password DB.
    //             if (err) {
    //                 console.log(err);
    //                 throw new Error(err);
    //             }
    //             signupModel.update({ password: hash }).then(() => {
    //                 res.status(201).json({ message: 'Successfuly update the new password' })
    //             })
    //         });
    //     });
    // } catch (error) {
    //     return res.status(403).json({ error, success: false })
    // }

}








module.exports = {
    forgetPassword,
    updatepassword,
    // resetpassword
}