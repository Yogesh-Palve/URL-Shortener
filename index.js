const express = require("express")
const path = require("path")
const urlRoute = require("./routes/url")
const connectMongoDb = require("./connection")
const URL = require("./models/url")
const staticRoute = require("./routes/staticRouter")
const app = express()
const PORT = 8000

// connection
connectMongoDb("mongodb://localhost:27017/short-url")
    .then(()=>console.log("mongodb connected!"))
    .catch(err => console.log("error : " , err)) 

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// middlewares 
app.use(express.json()) 
app.use(express.urlencoded({ extended : false })) 

// routes 
app.use("/url",urlRoute)
app.use("/",staticRoute)

app.listen(PORT,() => console.log(`Server started at PORT ${PORT}`)) 