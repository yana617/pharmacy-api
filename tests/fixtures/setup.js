const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { createAdminsCredentials } = require('./db');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
require('../../db/connect');

beforeAll(async () => {
  await createAdminsCredentials();
});

afterAll(async () => {
  await mongoose.disconnect();
});
