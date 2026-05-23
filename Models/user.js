const mongoose = require('mongoose')
// ye hmara usermodel bn chuka hh
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },
},
        {timestamps : true}
);


const User = mongoose.model("user",userSchema);
// model bnaya h ek name hai model or ek schema pass kiya h
module.exports = User;

