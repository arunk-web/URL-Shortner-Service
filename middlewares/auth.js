const {getUser} = require("../service/auth")   //yha se ayegii id

//this middleware will restrict the user to access the url shortening and analytics page if they are not logged in
//soo this middleware will handle the authentication part of our application
async function restrictToLoggedInUserOnly(req,res,next){
    const userUid = req.cookies?.uid;   //It checks the uid whose name is uid 

    if(!userUid) return res.redirect("/login");
 
    const user = getUser(userUid)
    if(!user) return res.redirect("/login");

    req.user = user;    //if everything is ok then put that user in our req and move to next 
    next();
} 

//this thing will handle the authentication

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;

    //if (!userUid) return res.redirect("/login")
    const user = getUser(userUid);


    //if(!user)  return res.redirect("/login")

    req.user = user;
    next() ;
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}