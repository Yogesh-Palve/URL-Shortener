const express = require("express")
const path = require("path")
const connectMongoDb = require("./connection")
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly} = require("./middleware/auth")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

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
app.use(cookieParser())

// routes 
app.use("/url", restrictToLoggedInUserOnly, urlRoute)
app.use("/user",userRoute)
app.use("/", staticRoute)

app.listen(PORT,() => console.log(`Server started at PORT ${PORT}`)) 