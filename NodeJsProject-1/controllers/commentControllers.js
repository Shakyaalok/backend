const commentModel = require('../models/commentModel');




const getComments = async(req, res) => {
    const { blogId } = req.params;
    const comment = await commentModel.findAll({ where: { blogId: blogId } }); // we cannot pass like this {id}-->getting error
    res.status(200).json(comment)
}


const addComments = async(req, res) => {
    const Comment = req.body;
    const comment = await commentModel.create(Comment);
    res.status(201).json(comment);
}




module.exports = { getComments, addComments };