const mongoose = require('mongoose');

const Admin = require('../../models/admin');
const Medicine = require('../../models/medicine');

const adminOne = {
  login: 'test',
  password: 'testTest',
};

const setupDatabase = async () => {
  await Admin.deleteMany();
  await Medicine.deleteMany();
};

module.exports = {
  setupDatabase,
  adminOne,
};
