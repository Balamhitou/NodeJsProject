const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const { default: validator } = require('validator');

var UserSchema = new mongoose.Schema({
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


UserSchema.methods.generateAuthToken = function(){
    var user= this;
    var access = 'auth';
    var token = jwt.sign({_id :user._id.toHexString(),access},'123abc').toString();
    user.tokens.push({access,token});
    return user.save().then(()=>{
        return token;
    })
};
var User =mongoose.model('User',UserSchema);
module.exports = {User};