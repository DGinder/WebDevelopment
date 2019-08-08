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
            res.render(("Authenticate/register"));
        }
        console.log(user)
        passport.authenticate("local")(req, res, function(){
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
    failureRedirect: "/login"}),
(req, res) => {});

//logout route
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/campgrounds");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;