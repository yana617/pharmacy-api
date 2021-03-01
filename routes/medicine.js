const route = require('express').Router();

const accessKeyRequired = require('../middlewares/accessKeyRequired');
const Medicine = require('../models/medicine');

route.get('/', accessKeyRequired, async (req, res) => {
  try {
    const { app } = req;
    const { limit, skip } = req.query;
    const sort = {
      name: 1,
    };
    await app.populate({
      path: 'medicines',
      options: {
        limit: parseInt(limit, 10),
        skip: parseInt(skip, 10),
        sort,
      },
    }).execPopulate();
    res.json({ success: true, medicines: app.medicines });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

route.get('/:id', accessKeyRequired, async (req, res) => {
  try {
    const { _id: app_id } = req.app;
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
