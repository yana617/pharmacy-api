const request = require('supertest');

const app = require('../app');
const Admin = require('../models/admin');
const { adminOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register new admin', async () => {
  const response = await request(app)
    .post(`/admins/register?register_token=${process.env.REGISTER_TOKEN}`)
    .send(adminOne)
    .expect(201);

  const { admin } = response.body;
  const adminInDb = await Admin.findById(admin._id);
  expect(adminInDb).not.toBeNull();
  expect(adminInDb.login).toEqual(admin.login);
});

test('Should login existing admin', async () => {
  await new Admin(adminOne).save();
  const response = await request(app)
    .post('/admins/login')
    .send(adminOne)
    .expect(200);

  const { admin } = response.body;
  expect(admin.login).toEqual(adminOne.login);
});

test('Shouldn\'t login not existing admin', async () => {
  const response = await request(app)
    .post('/admins/login')
    .send({
      login: 'test2',
      password: 'test2',
    })
    .expect(400);

  expect(response.error).not.toBeNull();
});

test('Shouldn\'t login admin when password is wrong', async () => {
  await new Admin(adminOne).save();
  const response = await request(app)
    .post('/admins/login')
    .send({
      login: adminOne.login,
      password: 'not-exist',
    })
    .expect(400);

  const { error } = response.body;
  expect(error).toBe('Invalid password');
});
