const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  originalText: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('History', historySchema);