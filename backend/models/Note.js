const { Schema} = require("mongoose");
const mongoose=require("mongoose");


const noteSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
            },
    title:{
        required:true,type:String
    },
    description:{
        required:true,type:String
    },
    tags:{
        type:String
    },
    date:{
        type:Date,default:Date.now
    }
})
module.exports=mongoose.model('note',noteSchema)