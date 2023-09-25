const express = require('express');
const router = express.Router();
const { getComments, addComments } = require('../controllers/commentControllers')


router.get('/:blogId', getComments);
router.post('/addcomments', addComments);




module.exports = router