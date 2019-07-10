var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = require('../models/user-model')

exports.addUser = function(req, res){
  let user = new User(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, (err, hash) => {
      if(err){
        throw err;
      }
      user.password = hash;
      user.save()
      .then(user => res.send('You are registrated'))
      .catch((err) => res.send(err.message))
    })
  })
}
