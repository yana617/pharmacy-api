const route = require('express').Router();

const accessKeyRequired = require('../middlewares/accessKeyRequired');
const Medicine = require('../models/medicine');

route.get('/', accessKeyRequired, async (req, res) => {
  try {
    const { app_id } = req;
    const medicines = await Medicine.find({ app_id });
    res.json({ success: true, medicines });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = route;
