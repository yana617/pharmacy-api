const mongoose = require('mongoose');

afterAll(() => {
  mongoose.disconnect();
});
