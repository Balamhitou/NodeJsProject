const { Db } = require('mongodb');
const {MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/User',(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDb');        
    }
    else{
        console.log('You are connected sucessufuly');
    }
    const db = client.db('User');
    //deletMany()
    db.collection('users').deleteMany({email: 'chafik@gmail.com' }).then((result)=>{
        console.log(result);
    });
});