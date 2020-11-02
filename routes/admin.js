const route = require('express').Router();
const bcrypt = require('bcrypt');

const { Admin } = require('../database/models/admin'); 

route.post('/register', async (req, res) => {
    try {
      const {
        register_token,
      } = req.query;
      if (register_token !== process.env.REGISTER_TOKEN) {
        return res.status(403).json({ message: 'Incorrect token' });
      }

      const {
        login,
        password,
      } = req.body;

      const adminExist = await Admin.findOne({ login });
      if (adminExist) {
        return res.status(400).json({ message: 'User with this login already exists' });
      }

      await bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json('crypt crashed gen salt');
        }
        bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
            return res.status(500).json(error.message);
          }  
          const admin = new Admin({
            login,
            hash,
            salt,
          });  
          await admin.save();
          res.json({ success: true });
        });
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

route.get('/get-all-admins', async (req, res) => {
    try {
      const admins = await Admin.find();
      res.send({ success: true, admins });
    } catch (err) {
      res.status(400).send({ success: false, error: err.message });
    }
  });

module.exports = route; 