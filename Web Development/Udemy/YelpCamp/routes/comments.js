var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Restful New Comment
router.get("/new",isLoggedIn, (req, res) => {
    
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //render campground
            res.render("Comments/new", {campground: foundCampground});
        }
    });
});

router.post("/",isLoggedIn, (req, res) => {
    
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            req.body.comment.text = req.sanitize(req.body.comment.text);
            //render campground
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    //if error
                    console.log("Oh No Error");
                    console.log(err);
                    res.redirect("/campgrounds");
                }
                else{
                    //add username
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.time = new Date();
                    //save
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            });
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