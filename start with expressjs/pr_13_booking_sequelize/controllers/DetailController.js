const DetailModel = require('../models/DetailModels');


const createDetails = async(req, res) => {
    try {
        const { name, email, title, mobile } = req.body;
        const ExistingEmail = await DetailModel.findOne({ where: { email } })
        if (ExistingEmail) {
            return res.status(500).send({
                message: 'you already registered',
                success: false,

            })
        }



        const detail = DetailModel.create({ title, name, email, mobile })
        res.status(201).send({
            message: 'your detail has been successfully saved',
            success: true,
            detail,
        })


    } catch (error) {
        res.status(500).send({
            message: 'error in creating a appointment',
            success: false,

        })
    }


}



// const getDetails = async(req, res) => {
//     try {
//         const { email, name, title, mobile } = req.body;
//         const user = await DetailModel.findOne({ email })

//         if (user) {
//             res.status(200).send({
//                 success: true,
//                 user
//             })
//         } else {
//             res.status(404).send({
//                 success: false,
//                 message: 'No User Found!'

//             })
//         }


//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: 'err in getDetails route'

//         })
//     }
// }



const GetAllDetails = async(req, res) => {
    const AllDetails = await DetailModel.findAll();
    res.status(200).send({
        message: 'All details',
        success: true,
        AllDetails
    })
}

const DeleteOne = async(req, res) => {
    // const { email } = req.body; for the postman through the body
    const { email } = req.params;
    await DetailModel.destroy({ where: { email } }) // if we use here await then it will not delete from database
    res.status(200).send({
        message: 'detail has been deleted successfully!',
        success: true,
    })
}

// const UpdateDetail = async(req, res) => {



//     try {
//         const { email } = req.params;
//         console.log(email)

//         const updatedData = {
//             name: req.body.name,
//             title: req.body.title,
//             mobile: req.body.mobile,
//             email: req.body.email
//         }


//         const AllDetails = await DetailModel.findOneAndUpdate({ email }, updatedData, { new: true });
//         console.log(AllDetails)
//             // AllDetails is updated Details
//         if (AllDetails) {

//             res.status(200).send({
//                 success: true,
//                 message: 'Details has been update successfully!',
//                 AllDetails
//             })


//         } else {
//             res.status(404).send({
//                 success: false,
//                 message: 'Details not found for the provided email.'
//             })
//         }


//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'An error occurred while updating details.'
//         });
//     }


// }

const UpdateDetail = async(req, res) => {
    try {
        const { email } = req.params;
        console.log(email);

        const updatedData = {
            name: req.body.name,
            title: req.body.title,
            mobile: req.body.mobile,
            email: req.body.email,
        };

        const AllDetails = await DetailModel.update({ updatedData });

        // await AllDetails.save();


        res.status(200).send({
            success: true,
            message: 'Details have been updated successfully!',
            AllDetails,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while updating details.',
        });
    }
};


const getOneDetails = async(req, res) => {



    try {
        const { email } = req.params;
        console.log(email)
        const AllDetails = await DetailModel.findOne({ where: { email } });
        console.log(AllDetails)
            // AllDetails is updated Details
        if (AllDetails) {

            res.status(200).send({
                success: true,
                message: 'Details fetched successfully!',
                AllDetails
            })


        } else {
            res.status(404).send({
                success: false,
                message: 'Details not found for the provided email.'
            })
        }


    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while geting details.'
        });
    }


}


module.exports = {
    createDetails,
    // getDetails,
    GetAllDetails,
    DeleteOne,
    getOneDetails,
    UpdateDetail
}