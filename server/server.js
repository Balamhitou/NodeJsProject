
const express= require('express');
const bodyParser = require('body-parser');
//const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose')
const _ =require('lodash');
const {User} = require('./models/user'); 
const { ObjectID } = require('mongodb');
const {authentificate}= require('./middelware/authentificate');
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


app.get('/user/me', authentificate,(req,res)=>{
  res.send(req.user);
});


app.post('/user/login', (req,res)=>{
   var body =_.pick(req.body,['email','password']);
   console.log(req.body.email + ' ' + req.body.password)
   User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
   }).catch((err)=>{
  res.status(400).send();
   });
});

app.delete('/user/me/token',authentificate, (req,res)=>{
   req.user.removeToken(req.token).then(()=>{
     res.status(200).send();
   },()=>{
     res.status(400).send();
   })
});

app.listen(3000,()=>{
  console.log('started on port 3000');
})

