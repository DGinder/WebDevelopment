var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Middleware = require("../middleware");

//Restful New Comment
router.get("/new",Middleware.isLoggedIn, (req, res) => {
    
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            //if error
            console.log("Oh No Error");
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            res.redirect("/campgrounds");
        }else{
            //render campground
            res.render("Comments/new", {campground: foundCampground});
        }
    });
});

//restfull create comment
router.post("/",Middleware.isLoggedIn, (req, res) => {
    
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            //if error
            console.log("Oh No Error");
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            res.redirect("/campgrounds");
        }else{
            req.body.comment.text = req.sanitize(req.body.comment.text);
            //render campground
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    //if error
                    console.log("Oh No Error");
                    console.log(err.message);
                    req.flash("error", err);
                    res.redirect("/campgrounds");
                }
                else{
                    //add username
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.time = new Date();
                    //save
                    comment.save();

                    req.user.comments.push(comment);
                    req.user.save();

                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    req.flash("success", "Successfully created comment!");
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            });
        }
    });
});

//restfull edit
router.get("/:comment_id/edit",Middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            res.render("Comments/edit.ejs", {campground_id: req.params.id, comment: foundComment})
        }
    });
});

//restfule update

//update campground route
router.put("/:comment_id",Middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, (err, updatedComment) => {
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            req.flash("success", "Updated comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy comment route
router.delete("/:comment_id",Middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        comment.remove();
    })
    req.flash("success", "Deleted comment!");
    res.redirect("/campgrounds/" + req.params.id);
});
module.exports = router;