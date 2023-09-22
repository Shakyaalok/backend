const express = require('express');

const router = express.Router();

// import from file/folder
const { createDetails, GetAllDetails, DeleteOne, getOneDetails, UpdateDetail } = require('../controllers/DetailController');

// , getDetails, , , ,  


router.post('/create', createDetails);
// router.post('/details', getDetails);
router.get('/alldetails', GetAllDetails);
router.get('/get/:email', getOneDetails);

router.delete('/delete/:email', DeleteOne);
router.put('/update/:email', UpdateDetail) // we have to do this like in postman http://localhost:5000/user/v1/update/:email=shakyaamit878@gmail.com



module.exports = router