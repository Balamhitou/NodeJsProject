const { ObjectID } = require('mongodb');
const {mongoose}= require('./server/db/mongoose');
const {ToDo} =require('./server/models/ToDo');


var id ="60e7926851283c083052c4c5";

ToDo.findById(id).then((todo)=>{
    console.log('ToDo : '+todo);
});


