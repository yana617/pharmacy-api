const router = require('express').Router();

const medicineRoute = require('./medicine');

router.use('/medicines', medicineRoute);

module.exports = router;
