var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

router.get("/", (req, res) => {
    res.render("landing");
});

//Authentication Routes
//register form
router.get("/register", (req, res) => {
    res.render(("Authenticate/register"));
});

//signup logic
router.post("/register", (req, res) => {
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect(("/register"));
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully signed up! Welcome " + req.body.username);
            res.redirect('/campgrounds');
        })
    });
});

//login form
router.get("/login", (req, res) =>{
    res.render("Authenticate/login")
});

router.post("/login", passport.authenticate("local",
    {successRedirect: "/campgrounds",
    failureRedirect: "/login",
failureFlash: true,
    successFlash: "Welcome to Yelp Camp"
}),(req, res) => {});

//logout route
router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

router.get("/*", function(req, res, next){
    res.redirect("/");
  });

module.exports = router;