var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: 'username is required'
  },
  password: {
    type: String,
    required: 'password is required'
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', userSchema);
