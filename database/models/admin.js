const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  login: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true, 
    },
  hash: { 
    type: String,
    required: true,
    },
  salt: {     
    type: String,
    required: true, 
    },  
});
   
 const Admin = mongoose.model('Admin', AdminSchema);

 module.exports = { Admin };
