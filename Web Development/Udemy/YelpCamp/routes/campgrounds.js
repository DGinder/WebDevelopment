var express = require("express");
var router = express.Router();;
var Campground = require("../models/campground");

//Restful INDEX Campground
router.get("/", (req, res) => {
    Campground.find({}, (err, campgroundData) => {
        if(err){
            console.log("Oh No Error");
            console.log(err);
        }else{
            res.render("Campgrounds/index", {data: campgroundData});
        }
    })
})

//Restful CREATE Campground
router.post("/",isLoggedIn, (req, res) => {
    req.body.name = req.sanitize(req.body.name);
    req.body.description = req.sanitize(req.body.description);
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, (err, campground) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("New Campground");
            console.log(campground);
        }
    })

    res.redirect("/campgrounds");
})


//Restful NEW Campground
router.get("/new",isLoggedIn, (req, res) => {
    res.render("Campgrounds/new.ejs");
})

//Restful SHOW Campground
router.get("/:id", (req, res) => {
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
        }else{
            res.render("Campgrounds/show", {campground: foundCampground});
        }
    });
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;