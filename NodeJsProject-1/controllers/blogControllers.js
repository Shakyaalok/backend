const blogModel = require('../models/blogModel');
const router = require('../routes/blogRoutes');


const addBlog = async(req, res) => {

    try {
        const Blog = req.body;
        const blog = await blogModel.create(Blog)
        res.status(201).send({
            message: 'your expense has been added successfully!',
            success: true,
            blog
        })


    } catch (error) {
        res.status(500).send({
            message: 'error in adding expense',
            success: false,

        })
    }
}


// const deleteOne = async(req, res) => {
//     try {
//         const { productName } = req.params;
//         await expenseModels.destroy({ where: { productName } })
//         res.status(200).send({
//             message: 'Deleted Successfully!',
//             success: true
//         })
//     } catch (err) {
//         res.status(500).send({
//             message: ' Deleted NOT Successfully!',
//             success: false
//         })
//     }
// }

const getAllBlogs = async(req, res) => {
    try {
        const getAllBlogs = await blogModel.findAll({});
        res.status(200).json(getAllBlogs)
    } catch (error) {
        console.log('error in get all the details')
    }
}




module.exports = {
    addBlog,
    getAllBlogs

};