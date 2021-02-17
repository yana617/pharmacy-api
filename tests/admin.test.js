const request = require('supertest');

const app = require('../app');
const Admin = require('../models/admin');
const { adminOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register admin', async () => {
  const response = await request(app)
    .post(`/admins/register?register_token=${process.env.REGISTER_TOKEN}`)
    .send(adminOne)
    .expect(201);

  const { admin } = response.body;
  const adminInDb = await Admin.findById(admin._id);
  expect(adminInDb).not.toBeNull();
  expect(adminInDb.login).toEqual(admin.login);
});
