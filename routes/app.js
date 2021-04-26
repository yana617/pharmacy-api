const route = require('express').Router();

const App = require('../models/app');
const Medicine = require('../models/medicine');
const authRequired = require('../middlewares/authRequired');

route.get('/', authRequired, async (req, res) => {
  try {
    const { _id: admin_id } = req.user;
    let apps = await App.find({ admin_id });
    apps = await Promise.all(apps.map(async (app) => {
      const medicinesCount = await Medicine.countDocuments({ app_id: app._id });
      return { ...app.toObject(), medicinesCount };
    }));
    res.json({ success: true, apps });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = route;
