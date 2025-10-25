// const sessionIdToUserMap = new Map()
const jwt = require("jsonwebtoken")
const secret = "The_Secret"

function setUser(user) {
    // sessionIdToUserMap.set(id,user)
    return jwt.sign(
        {
            _id : user._id,
            email : user.email,
            role : user.role
        },
        secret
    )
}

function getUser(token) {
    // return sessionIdToUserMap.get(id) // return stmt
    try{
        return jwt.verify(token,secret)
    }
    catch(err) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}