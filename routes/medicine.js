const route = require('express').Router();

const accessKeyRequired = require('../middlewares/accessKeyRequired');

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

module.exports = route;
