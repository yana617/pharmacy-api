const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  access_key: {
    type: String,
    required: true,
    select: false,
  },
  admin_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
}, {
  timestamps: true,
});

appSchema.virtual('medicines', {
  ref: 'Medicine',
  localField: '_id',
  foreignField: 'app_id',
});

const App = mongoose.model('App', appSchema);

module.exports = App;
