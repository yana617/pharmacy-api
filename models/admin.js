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

AdminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.hash;
  delete adminObject.salt;
  delete adminObject.__v;

  return adminObject;
};
 
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
