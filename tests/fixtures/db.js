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

const appOneId = new mongoose.Types.ObjectId();
const appTwoId = new mongoose.Types.ObjectId();

const appOne = {
  _id: appOneId,
  name: 'AppOne',
  access_key: 'test-key',
  admin_id: adminOneId,
};
const appTwo = {
  _id: appTwoId,
  name: 'AppTwo',
  access_key: 'test-key-two',
  admin_id: adminTwoId,
};

const medicineOne = {
  name: 'Ambroxol',
  expiration_date: new Date(),
  count: 5,
  type: 'tablet',
  app_id: appOneId,
};
const medicineTwo = {
  name: 'Metoclopramide',
  expiration_date: new Date(),
  count: 10,
  type: 'tablet',
  app_id: appTwoId,
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
  medicineOne,
  medicineTwo,
};
