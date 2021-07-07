
const express= require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./mongoose');

const {User} = require('./user');
var app = express();
app.use(bodyParser.json());

app.post('/user', (req, res) => {
  var body = _.pick(req.body,['email',' password']);
  var user = new User(body);
  user.save().then((user)=>{
      escape.send(user);
  })
    .catch((e)=>{
          res.status(400).send(e);
      })
  })

