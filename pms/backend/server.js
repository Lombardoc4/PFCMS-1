const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio  = require('socket.io');

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

var server = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

var io= require('socket.io').listen(server);

mongoose.connect('mongodb://test:test123@ds145916.mlab.com:45916/pfcms', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

let Chat = require('./models/chat.model');
var chatRoutes = express.Router();


chatRoutes.post('/', function(req, res) {
  let message = new Chat(req.body);
  message.save()
  .then(message => {
    res.status(200).send('msg sent');
  })
  .catch(err => {
    res.status(400).send('msg failed');
  });
});

chatRoutes.get('/', function(req, res) {
    Chat.find(function(err, chats) {
        if (err) {
            console.log(err);
        } else {
            res.json(chats);
        }
    });
});

io.on('connection', (socket) => {
    // get all messages from db
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){

        io.emit('RECEIVE_MESSAGE', data);
    })
});

app.use('/chat', chatRoutes);

let User = require('./models/users.model');
var userRoutes = express.Router();

userRoutes.post('/add', function(req, res) {
    let user = new User(req.body);
    user.save()
      .then(user => {
        res.status(200).send('User has been submitted');
      })
      .catch(err => {
        res.status(400).send('User creation failed');
      });
});

userRoutes.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.get('/:username', function(req, res) {
    let user = req.params.username;
    User.findOne({username: user}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
});



app.use('/users', userRoutes);

let Request = require('./models/request.model');
var requestRoutes = express.Router();


requestRoutes.post('/', function(req, res) {
    let request = new Request(req.body);
    request.save()
      .then(request => {
        res.status(200).send('request has been submitted');
      })
      .catch(err => {
        res.status(400).send('Request failed');
      });
});

app.use('/requests', requestRoutes);
