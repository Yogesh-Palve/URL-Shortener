const express = require("express")
const urlRoute = require("./routes/url")
const connectMongoDb = require("./connection")
const app = express()
const PORT = 8000

// connection
connectMongoDb("mongodb://localhost:27017/short-url")
    .then(()=>console.log("mongodb connected!"))
    .catch(err => console.log("error : " , err)) 

// middlewares 
app.use(express.json())  

// routes 
app.use("/",urlRoute)

app.listen(PORT,() => console.log(`Server started at PORT ${PORT}`)) 