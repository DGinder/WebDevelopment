var express = require("express");
var router = express.Router();;
var Campground = require("../models/campground");
var Middleware = require("../middleware");

//Restful INDEX Campground
router.get("/", (req, res) => {
    Campground.find({}, (err, campgroundData) => {
        if(err){
            console.log("Oh No Error");
            console.log(err.message);
        }else{
            res.render("Campgrounds/index", {data: campgroundData});
        }
    })
})

//Restful CREATE Campground
router.post("/",Middleware.isLoggedIn, (req, res) => {
    req.body.name = req.sanitize(req.body.name);
    req.body.description = req.sanitize(req.body.description);
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, (err, campground) => {
        if(err || !campground){
            req.flash("error", "Error creating campground!");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            console.log("New Campground");
            console.log(campground);
            req.flash("success", "Successfully created Campground");
            res.redirect("/campgrounds");
        }
    })

})


//Restful NEW Campground
router.get("/new",Middleware.isLoggedIn, (req, res) => {
    res.render("Campgrounds/new.ejs");
})

//Restful SHOW Campground
router.get("/:id", (req, res) => {
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            //if error
            console.log("Oh No Error");
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            res.redirect('/campgrounds');
        }else{
            res.render("Campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit campground route
router.get("/:id/edit",Middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("Campgrounds/edit", {campground: foundCampground});
    });
});

//update campground route
router.put("/:id",Middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, (err, updatedCampground) => {
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Successfully updated campground!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy camprground route
router.delete("/:id",Middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        campground.remove();
    })
    req.flash("success", "Deleted campground!");
    res.redirect("/campgrounds");
});

module.exports = router;