const mongoose = require('mongoose');

const drug_type = [
  'capsule',
  'tablet',
  'injection',
  'powder',
  'ointment',
  'cream', 
  'gel', 
  'solution', 
  'tincture', 
  'suspension', 
  'drops', 
  'syrup', 
  'aerosol', 
  'other',
];

const drug_class = [
  'antibacterial_drugs', 
  'hormones', 
  'drugs_affecting_immunity', 
  'drugs_affecting_metabolism', 
  'drugs_affecting_the_psyche', 
  'drugs_affecting_blood_clotting',
  'drugs_affecting_vascular_tone', 
  'drugs_affecting_the_function_of_the_bronchi', 
  'antiparasitic_and_antihelminthic_drugs', 
  'drugs_affecting_the_function_of_the_gastrointestinal_tract', 
  'drugs_affecting_myocardial_function', 
  'drugs_affecting_renal_function', 
  'antiviral_drugs', 
  'antiinflammatory_and_pain_relievers',
  'antifungal_drugs', 
  'antineoplastic_drugs', 
  'others',
];

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
    enum: drug_type,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    enum: drug_class,
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
