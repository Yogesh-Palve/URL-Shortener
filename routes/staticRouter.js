const express = require("express")
const router = express.Router()
const URL = require("../models/url")
const {restrictToLoggedInUserOnly} = require("../middleware/auth")

router.get("/" , restrictToLoggedInUserOnly, async (req,res) => {
    if(!req.user) return redirect("/login")
    const allUrls = await URL.find({createdBy : req.user._id})
    console.log(allUrls);
    res.render('home', {
        urls : allUrls,
    })
})

router.get("/signup", async (req,res) => {
    res.render("signup")
})
router.get("/login", async (req,res) => {
    res.render("login")
})


module.exports = router 