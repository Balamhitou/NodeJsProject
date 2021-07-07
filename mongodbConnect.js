//const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/User',(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDb');        
    }
    else{
        console.log('You are connected sucessufuly');
    }
    //const db = client.db('User');
    // db.collection('users').insertOne({
    //     email : 'amina@gmail.com',
    //     password : 'amina99'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert user', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined,2))
    // })
    client.close();
});

