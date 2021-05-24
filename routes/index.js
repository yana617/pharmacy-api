const router = require('express').Router();

const medicineRoute = require('./medicine');
const adminRoute = require('./admin');
const appRoute = require('./app');
const translateRoute = require('./translate');

router.use('/medicines', medicineRoute);
router.use('/admins', adminRoute);
router.use('/apps', appRoute);
router.use('/translates', translateRoute);

module.exports = router;
