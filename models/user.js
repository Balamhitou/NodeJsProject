const mongoose= require('mongoose');
const { default: validator } = require('validator');
const validator = require('validator');

var User = mongoose.model('User', {
    email: {
        type: String,
        required : true,
        trim : true,
        minlenght : 1,
        unique : true,
        validate : {
          validator : validator.isEmail,
          message :"(VALUE) is not a valid Email"
        }
    },
    password :{
        type : String,
        required : true,
        minlenght : 6
    },
    tokens : [{
        access : {
            type: String,
            required :  true
        },
        token : {
            type: String,
            required : true
        }
    }]
});
module.export = {User}