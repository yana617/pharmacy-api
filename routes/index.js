const router = require('express').Router();

const medicineRoute = require('./medicine');
const adminRoute = require('./admin');
const appRoute = require('./app');

router.use('/medicines', medicineRoute);
router.use('/admins', adminRoute);
router.use('/apps', appRoute);

module.exports = router;
