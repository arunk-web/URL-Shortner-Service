const express = require('express')
const URL = require("../Models/url")

const router = express.Router();


router.get("/", async (req,res) => {
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({ createdBy : req.user._id });
    return res.render("home",{
        urls : allUrls,
        user:req.user,
        currentPage: 'home',
    }); 
});


router.get("/signup", (req,res) => {
    return res.render("signup",{
        user: req.user,
        currentPage: 'signup',
    });
});

router.get("/login", (req,res) => {
    return res.render("login",{
        user: req.user,
        currentPage: 'login',
    });
});

module.exports = router;







