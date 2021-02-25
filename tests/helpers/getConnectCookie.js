const request = require('supertest');

const app = require('../../app');

module.exports = async (adminCredentials) => {
  const loginResponse = await request(app)
    .post('/admins/login')
    .send(adminCredentials)
    .expect(200);

  const [sessionHeader] = loginResponse.headers['set-cookie'];
  const connectCookie = sessionHeader.split(';')[0];
  return connectCookie;
};
