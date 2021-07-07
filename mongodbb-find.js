const {MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/User',(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDb');        
    }
    else{
        console.log('You are connected sucessufuly');
    }
  const db = client.db('User');
  db.collection('users').find().toArray().then((docs)=>{
console.log('users :');
console.log(JSON.stringify(docs, undefined, 2));
  }, (err)=>{
console.log('uable to find the users ',err)
  })

    //client.close();
});