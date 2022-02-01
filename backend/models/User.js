const { Schema} = require("mongoose");
const mongoose=require("mongoose");


const schema=new Schema({
   
    name:{
        required:true,type:String
    },
    email:{
        required:true,type:String,unique:true
    },
    password:{
        required:true,type:String
    },
    date:{
        type:Date,default:Date.now
    }
})
module.exports=mongoose.model('user',schema)