const route = require('express').Router();

const App = require('../models/app');
const authRequired = require('../middlewares/authRequired');

route.get('/', authRequired, async (req, res) => {
  try {
    const { _id: admin_id } = req.user;
    const apps = await App.find({ admin_id });
    res.json({ success: true, apps });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = route;
