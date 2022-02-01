const express=require("express")
const app=express()
const cors=require("cors");
const myCon=require("./db")
app.use(cors())
const cookieParser = require('cookie-parser');
app.use(express.json())
app.use(cookieParser());
//databace connection
myCon();

//my routes
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))

  app.listen(4000,()=>{
      
  })
