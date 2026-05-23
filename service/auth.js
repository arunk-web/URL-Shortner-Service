const sessionIdtoUserMap = new Map();     //hashmap banaya hai sessionId ko user se map krne ke liyeii

function setUser(id,user){
    sessionIdtoUserMap.set(id,user)
}


function getUser(id){
    return sessionIdtoUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}