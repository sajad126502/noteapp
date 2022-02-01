const express = require("express")
const User = require("../models/User")
const Router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mySecretKey = "mynameissajadbashirnaikoo"
const fetchUser =require("../middleware/fetchUser")

Router.post('/register', async (req, res) => {
    console.log(req.body)
    const secPass = bcrypt.hashSync(req.body.password, 10);
    const chk = await User.findOne({ email: req.body.email })
    if (chk) {
        res.status(200).json({ error: "user already exists " })
    }
    else{

        try{
            
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
     password: secPass
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const token = await jwt.sign(data, mySecretKey)
    // console.log(user.id)
    res.json(req.body)
}
catch(e){
    res.status(400).json({ error: "something went wrong" })
}
}
})
Router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email:email})
    if (!user) {
        res.status(200).json({ error: "Your inputs are wrong Check your inputs" })
    }
    else {
        const chk = await bcrypt.compare(password,user.password);
        if (!chk) {
            res.status(200).json({ error: "Your inputs are wrong Check your inputs" })
        }
        else {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = await jwt.sign(data, mySecretKey)
            res.json({ token })
        }
    }
})
Router.get("/getuser",fetchUser,async(req,res)=>{
   data=await User.findById(req.user.id).select("-password")
   res.json({data})
})
module.exports = Router