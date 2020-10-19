const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  app_id: {
    type: mongoose.Types.ObjectId,
    ref: 'App',
    required: true,
  },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
