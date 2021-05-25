const mongoose = require('mongoose');

const { MEDICINES_TYPES, MEDICINES_CLASSES } = require('../db/constants');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: MEDICINES_TYPES,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    enum: MEDICINES_CLASSES,
    required: true,
  },
  app_id: {
    type: mongoose.Types.ObjectId,
    ref: 'App',
    required: true,
  },
}, {
  timestamps: true,
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
