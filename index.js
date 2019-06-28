var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Messages = require('./api/models/message-model');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
  res.send('It works perfect lala')
})

app.get('/messages', (req, res) =>{
  Messages.find({}, (err, docs) => {
    if(err){
      var error = Object.assign({}, err);
      res.status(400).send(error);
    } else {
      res.send(docs);
    }
  })
})

var users = [];
var connections = [];
server.listen(4000);

io.sockets.on('connection', function(socket){
  connections.push(socket);
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on('sendMess', function(data){
    var message = new Messages(data);
    message.save((err, message) => {
      if(err){
        var error = Object.assign({}, err);
        io.sockets.emit('errMess', error);
      }else{
        io.sockets.emit('addMess', {message: data})
      }
    })
  })
})
