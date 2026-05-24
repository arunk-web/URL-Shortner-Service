
const shortid = require("shortid")
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url is required "})

    const shortID = shortid();

    //this is the place where url is generated....
    await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory : [],
        createdBy : req.user._id, 
    });

    return res.render("home", {
        id : shortID
    }); 

    // return res.redirect(`/?id=${shortID}`); 

    // return res.json({ id : shortID });
    //yha jo hmne short id generate ki thi wo return kr diii

}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    if(!result){
        return res.status(404).json({error : "URL not found"});
    }   //for null check 
 
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}

//yha se function export kr diyaaaa


