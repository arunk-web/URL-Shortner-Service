const {v4: uuidv4} = require('uuid');
const User = require('../Models/user');
const {setUser} = require('../service/auth')



async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    //yha se hm new user create kr rhe haiii
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogout(req,res){
    res.clearCookie("uid");
    return res.redirect("/login");
}
 
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    //yha se hm login kr rhe haiii
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error : "Invalid Username or Password",
            currentPage: 'login',
        });
    }

    // const sessionId = uuidv4();    phle krte the session id generate krne ka haii but ab hm jwt token generate kr rhe haii
    // setUser(sessionId,user)
    const token = setUser(user)
    res.cookie("uid",token)    //response me cookie send kiya and send  cookie name = uid
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
}



