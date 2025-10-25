const express = require("express")
const router = express.Router()
const URL = require("../models/url")
const {restrictTo} = require("../middleware/auth")

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req,res) => {
    if(!req.user) return res.redirect("/login")
    const allUrls = await URL.find({createdBy : req.user._id})
    // console.log(allUrls)
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

// just for demonstration that admin can access all the urls
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req,res) => {
    if(!req.user) return res.redirect("/login")
    const allUrls = await URL.find({})
    // console.log(allUrls);
    res.render('home', {
        urls : allUrls,
    })
})


module.exports = router 