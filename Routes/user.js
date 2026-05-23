const express = require('express')
const {handleUserSignup,handleUserLogin} = require('../Controller/user');    //aise import hota haiii esme koi folder
//esme login sign up wala kaam hoga
const router = express.Router();
// const {handleUserLogin} = require('../Controller/user');


router.post("/",handleUserSignup)    //upr import krke aise redirect krte haiii
router.post("/login",handleUserLogin);



module.exports = router;