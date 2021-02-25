const route = require('express').Router();

const Medicine = require('../models/medicine');

route.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json({ success: true, medicines });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = route;
