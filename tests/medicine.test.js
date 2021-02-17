const request = require('supertest');

const app = require('../app');
const Medicine = require('../models/admin');
const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should work', async () => {
  expect(true).toBe(true);
});
