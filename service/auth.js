// const sessionIdtoUserMap = new Map();     //hashmap banaya hai sessionId ko user se map krne ke liyeii   (ye state maintain krta haii ki konsa sessionId kis user se belong krta haiii)
//jis id ke baare me baat hui thi video meee authentication mee

const jwt = require("jsonwebtoken");
const secret = "Arun123@$";

function setUser(user){
    // const payload = {
    //     id,
    //     ...user,
    // };
    return jwt.sign({
        _id : user._id,
        email : user.email,
        name : user.name
    }, secret);
} 
//this part will mark token generate krne ka haii jo user ko milega login krne ke baad and us token me user ki information hogi jo hmne payload me daali haii


function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}



//there is a problem in this map that when the server restarted then we need to login again because the map gets empty on refreshing 



