const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Admin = require('../../models/admin');
const Medicine = require('../../models/medicine');
const App = require('../../models/app');

const adminOneId = new mongoose.Types.ObjectId();
const adminTwoId = new mongoose.Types.ObjectId();

const adminOne = {
  _id: adminOneId,
  login: 'test',
  password: 'testTest',
};

const adminTwo = {
  _id: adminTwoId,
  login: 'test-2',
  password: 'testTest2',
};

const appOne = {
  name: 'AppOne',
  access_key: 'test-key',
  admin_id: adminOneId,
};
const appTwo = {
  name: 'AppTwo',
  access_key: 'test-key-two',
  admin_id: adminTwoId,
};

const createAdminsCredentials = async () => {
  adminOne.salt = await bcrypt.genSalt(10);
  adminOne.hash = await bcrypt.hash(adminOne.password, adminOne.salt);
  adminTwo.salt = await bcrypt.genSalt(10);
  adminTwo.hash = await bcrypt.hash(adminTwo.password, adminTwo.salt);
};

const setupDatabase = async () => {
  await Promise.all([Admin.deleteMany(), Medicine.deleteMany(), App.deleteMany()]);
};

module.exports = {
  setupDatabase,
  adminOne,
  adminTwo,
  appOne,
  appTwo,
  createAdminsCredentials,
};
