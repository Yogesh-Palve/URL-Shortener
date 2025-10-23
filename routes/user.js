const express = require("express")
const route = express.Router()

const {handleUserSignUp, handleUserLogin} = require("../controllers/user")

route.post("/",handleUserSignUp)
route.post("/login", handleUserLogin)

module.exports = route