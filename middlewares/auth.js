const { TokenExpiredError } = require("jsonwebtoken");
const {getUser} = require("../service/auth")   //yha se ayegii id

//this middleware will restrict the user to access the url shortening and analytics page if they are not logged in
//soo this middleware will handle the authentication part of our application
async function restrictToLoggedInUserOnly(req,res,next){
    // const userUid = req.cookies?.uid;   //It checks the uid whose name is uid 
    // const userUid = req.headers["Authorization"];

    // console.log(req.headers);
    const token = req.cookies?.uid;

    if(!token) return res.redirect("/login");
    // const token = userUid.split("Bearer ")[1];       //"Bearer [2302ukdkkdnfn]"
    const user = getUser(token);

    if(!user) return res.redirect("/login");

    req.user = user;    //if everything is ok then put that user in our req and move to next 
    next();
} 

//this thing will handle the authentication

async function checkAuth(req,res,next){
    const token = req.cookies?.uid;
    // console.log(req.headers)
    // const userUid = req.headers["authorization"];

    
    if(!token) return next();

    // const token = userUid.split("Bearer ")[1]; 

    // if (!userUid) return res.redirect("/login")
    const user = getUser(token);


    // if(!user)  return res.redirect("/login")

    req.user = user;
    next() ;
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}