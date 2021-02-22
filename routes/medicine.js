const route = require('express').Router();

const Medicine = require('../models/medicine');

route.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.send({ success: true, medicines });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
});

module.exports = route;
