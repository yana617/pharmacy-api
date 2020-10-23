const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  login: { 
      type: String, 
      required: true, 
      trim: true 
    },
  hash: { 
      type: String, 
      required: true 
    },
  salt: { 
      type: String, 
      required: true 
    },  
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;