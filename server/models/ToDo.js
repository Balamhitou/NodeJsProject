var mongoose=require('mongoose');

var toDo= mongoose.model('TodoApp', {
    text : {
      type : String,
      required: true,
      minlenght : 1,
      trim : true, //for espace
    },
    completed :{
      type : Boolean,
      default : false
    },
    completedAt :{
      type : Number,
      default : null
    }
  });

  module.exports={toDo};