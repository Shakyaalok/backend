const express = require('express');
const router = express.Router();
const { premiumFeauter } = require('../controllers/premiumFeatureController');
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)

// router.post('/', premiumFeauter); // if we are using post in both front and backend then we get 401 and it is when we do not send anything in the body
// so try get in that case
router.get('/', premiumFeauter);






module.exports = router;