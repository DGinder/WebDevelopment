var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");

//application set up
mongoose.connect("mongodb://localhost:27017/AuthTest", { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "This is a Secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//-----------------------------------------------
//routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret",isLoggedIn, (req, res) => {
    res.render("secret");
});

//authentication routes

//signup
app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }
        console.log(user)
        passport.authenticate("local")(req, res, function(){
            res.render('secret');
        })
    });
})

//login
app.get("/login", (req, res) => {
    res.render("login");
});

//middlewhere runs before function
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

//logout
app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Auth has started on %s port %s!", host, port)    
});
