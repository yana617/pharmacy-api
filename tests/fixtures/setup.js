const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
require('../../db/connect');

afterAll(async () => {
  await mongoose.disconnect();
});
