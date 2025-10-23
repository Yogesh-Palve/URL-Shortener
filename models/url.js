const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema(
    { 
        shortId : {
            type : String,
            required : true,
            unique : true
        },
        redirectURL : {
            type : String,
            required : true
        },
        visitHistory : [ {timeStamp : Number} ], // array of timestamp objects
        createdBy : {
            type : mongoose.Schema.Types.ObjectId, 
            ref : "users"
        }
    }, 
    {timeStamps : true}
)

const URL = mongoose.model("url" , urlSchema)

module.exports = URL