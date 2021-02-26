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

route.get('/:id', accessKeyRequired, async (req, res) => {
  try {
    const { app_id } = req;
    const { id: medicineId } = req.params;
    const medicine = await Medicine.findOne({ _id: medicineId, app_id });

    if (!medicine) {
      return res.status(400).json({ success: false, error: 'Medicine is not found' });
    }

    res.json({ success: true, medicine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = route;
