const jwt=require("jsonwebtoken")
const fetchUser=async(req,res,next)=>{
const token=req.header("my-token");
if(!token){
res.status(401).json({error:"Plz enter the valid token"})
}
try{

    const data= jwt.verify(token,"mynameissajadbashirnaikoo")
    
    req.user=data.user
    next()
    
}
catch{

    res.json({error:"something went wrong"})
}

}
module.exports=fetchUser