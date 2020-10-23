const mongoose = require('mongoose');

const { DRUG_TYPES, DRUG_CLASSES } = require('../constants');

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
    enum: DRUG_TYPES,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    enum: DRUG_CLASSES,
    required: false,
  },
  app_id: {
    type: mongoose.Types.ObjectId,
    ref: 'App',
    required: true,
  },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
