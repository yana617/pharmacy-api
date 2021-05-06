const route = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const App = require('../models/app');
const authRequired = require('../middlewares/authRequired');
const validateApp = require('../middlewares/validateApp');

route.get('/', authRequired, async (req, res) => {
  try {
    const { _id: admin_id } = req.user;
    const apps = await App.find({ admin_id });
    res.json({ success: true, apps });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

route.get('/:id', authRequired, async (req, res) => {
  try {
    const { _id: admin_id } = req.user;
    const { id: app_id } = req.params;
    const app = await App.findById(app_id);
    if (!app) {
      return res.status(400).json({ success: false, error: 'App not found.' });
    }
    if (app.admin_id.toString() !== admin_id.toString()) {
      return res.status(400).json({ success: false, error: 'This app is not assigned to you.' });
    }
    res.json({ success: true, app });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

route.post('/', authRequired, validateApp, async (req, res) => {
  try {
    const { _id: admin_id } = req.user;
    let newApp = new App({ ...req.body, access_key: uuidv4(), admin_id });
    await newApp.save();
    newApp = newApp.toObject();
    delete newApp.access_key;
    res.json({ success: true, app: newApp });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = route;
