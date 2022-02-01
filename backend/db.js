const mongoose=require("mongoose")
const mongo_url='mongodb://localhost/mynote';
const myCon=()=>{

    mongoose.connect(mongo_url).then(()=>{
      
        console.log("db connected sucessfully")
    }).catch(()=>{
        console.log("something went wrong")
    })
}
module.exports=myCon