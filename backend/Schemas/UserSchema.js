const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
   type:String,
   required:true,
   unique:true
  },
  passowrd:{
    type:String,
    required:true
  },
},{timestamps:true})
module.exports = mongoose.model('user',UserSchema);