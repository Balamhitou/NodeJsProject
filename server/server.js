
const express= require('express');
const bodyParser = require('body-parser');
//const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose')
const _ =require('lodash');
const {User} = require('./models/user'); 
const { ObjectID } = require('mongodb');

const {toDo} = require('./models/ToDo');
var app = express();

app.use(bodyParser.json());
//app.use(bodyParser.json());
app.post('/todos', (req, res)=>{
var todo = new toDo({
  text : req.body.text
});
todo.save().then((doc)=>{
  res.send(doc);
},(e)=>{
  res.status(400).send(e);
})
});
//app.get('/todos2',(req,res)=>{
//  toDo.find().then((todos)=>{
  //  res.send({todos});
 // },(e)=>{
   // res.status(400).send(e);
  //})
//})

app.get('/todoq/:id', (req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid){
      res.status(404).send();
  }

  toDo.find(id).then((todo)=>{
       res.status(200).send(todo);
  },(e)=>{
      res.status(404).send();
  })
});

app.post('/user',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);
  user.save().then(()=>{
    return user.generateAuthToken();
    
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })     
});


// app.post('/user', (req, res) => {
//   var body = _.pick(req.body,['email',' password']);
//   var user = new User(body);
//   user.save().then((user)=>{
//       escape.send(user);
//   })
//     .catch((e)=>{
//           res.status(400).send(e);
//       })
//   })
app.listen(3000,()=>{
  console.log('started on port 3000');
})

