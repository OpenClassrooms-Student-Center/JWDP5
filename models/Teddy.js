const mongoose = require('mongoose');

const cameraSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  colors: { type: [String], required: true }
});

module.exports = mongoose.model('Camera', cameraSchema);