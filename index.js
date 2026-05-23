const express = require("express");
const {connectToMongoDB} = require("./connect")

const URL = require("./Models/url")
const path = require('path')         //BUILTIN 
const cookieParser = require('cookie-parser')
const urlRoute = require("./Routes/url")
const staticRoute = require('./Routes/staticRouter');
const userRoute = require('./routes/user')


const app = express();
const PORT = 8001; 

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log('Mongodb Connected'))

//ye view engine set krne ka haiiii
app.set("view engine" , "ejs")    //hmara view engine hai ejs ye express  ko btaya
app.set('views',path.resolve("./views"))   //hmari jo ejs ki files haii wo views folder me pdi hh

 
app.use(express.json());     //middleware
app.use(express.urlencoded({extended : false}));   //middleware
app.use(cookieParser())



//server side rendering   html page rendered from server
// app.get("/test" , async (req,res) => {
//     const allUrls = await URL.find({})     //yha se ye file utayega hai hmare frontened pe render kr dega
//     return res.render("home",{
//         urls: allUrls,
//     });
// });

app.use("/url", urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get('/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, 
    { 
        $push : {
        visitHistory : {
            timestamp : Date.now(),
        },
    },
    } 
);

res.redirect(entry.redirectURL);
});


app.listen(PORT , ()=>console.log(`Server started at PORT : ${PORT}`));