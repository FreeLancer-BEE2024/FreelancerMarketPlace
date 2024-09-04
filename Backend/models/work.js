const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: String,
  description: String,
  requirements: String,
  duration: Number,
  budget: Number,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
});

module.exports = mongoose.model('Work', workSchema);