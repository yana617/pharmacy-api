const router = require('express').Router();

const medicineRoute = require('./medicine');
const adminRoute = require('./admin');

router.use('/medicines', medicineRoute);
router.use('/admins', adminRoute);

module.exports = router;
