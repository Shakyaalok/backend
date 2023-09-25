const express = require('express');
const router = express.Router();

const { addBlog, getAllBlogs } = require('../controllers/blogControllers')


router.post('/addBlog', addBlog);
router.get('/getAllBlogs', getAllBlogs);
// router.delete('/delete/:productName', deleteOne)
// router.get('/alldetails', getAllDetails)


module.exports = router