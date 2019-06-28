var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: 'message is required',
  },
  creationDate: {
    type: Date,
    required: 'creation date is required'
  },
  name: {
    type: String,
    required: 'name is required'
  }
})

module.exports = mongoose.model('Messages', messageSchema);
