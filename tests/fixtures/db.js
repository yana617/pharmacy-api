const bcrypt = require('bcrypt');

const Admin = require('../../models/admin');
const Medicine = require('../../models/medicine');

const adminOne = {
  login: 'test',
  password: 'testTest',
};

const setupDatabase = async () => {
  await Admin.deleteMany();
  await Medicine.deleteMany();
  adminOne.salt = await bcrypt.genSalt(10);
  adminOne.hash = await bcrypt.hash(adminOne.password, adminOne.salt);
};

module.exports = {
  setupDatabase,
  adminOne,
};
