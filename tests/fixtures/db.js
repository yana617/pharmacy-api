const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Admin = require('../../models/admin');
const Medicine = require('../../models/medicine');
const App = require('../../models/app');

const adminOne = {
  login: 'test',
  password: 'testTest',
};

const appOneAdminsId = new mongoose.Types.ObjectId();

const appOne = {
  name: 'AppOne',
  access_key: 'test-key',
  admin_id: appOneAdminsId,
};

const setupDatabase = async () => {
  await Promise.all([Admin.deleteMany(), Medicine.deleteMany(), App.deleteMany()]);
  adminOne.salt = await bcrypt.genSalt(10);
  adminOne.hash = await bcrypt.hash(adminOne.password, adminOne.salt);
};

module.exports = {
  setupDatabase,
  adminOne,
  appOne,
};
