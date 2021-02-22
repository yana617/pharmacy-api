const bcrypt = require('bcrypt');
const passport = require('passport');
const route = require('express').Router();

const Admin = require('../models/admin');

route.post('/register', async (req, res) => {
  try {
    const {
      register_token,
    } = req.query;
    if (register_token !== process.env.REGISTER_TOKEN) {
      return res.status(403).json({ success: false, error: 'Incorrect token' });
    }

    const {
      login,
      password,
    } = req.body;

    const adminExist = await Admin.findOne({ login });
    if (adminExist) {
      return res.status(400).json({ success: false, error: 'User with this login already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = new Admin({
      login,
      salt,
      hash,
    });

    await admin.save();
    res.status(201).json({ success: true, admin });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

route.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, admin, message) => {
    if (!admin) {
      return res.status(400).json({ success: false, ...message });
    }

    req.login(admin, (error) => {
      if (error) {
        return res.status(400).json({ success: false, ...message });
      }

      res.json({
        success: true,
        admin: {
          login: admin.login,
        },
      });
    });
  })(req, res, next);
});

module.exports = route;
