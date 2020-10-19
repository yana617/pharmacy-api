const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  access_key: {
    type: String,
    required: true,
  },
});

appSchema.virtual('medicines', {
  ref: 'Medicine',
  localField: '_id',
  foreignField: 'app_id',
});

const App = mongoose.model('App', appSchema);

module.exports = App;
