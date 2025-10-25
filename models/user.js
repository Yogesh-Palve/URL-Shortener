const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "NORMAL" // for now all user who login are NORMAL
    }
},{ timestamps : true})

const User = mongoose.model("User", userSchema)

module.exports = User
