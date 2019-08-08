//variable set up and app set up
var express             = require("express"),
    app                 = express(),
    expressSanitizer    = require("express-sanitizer"),
    bodyParser          = require("body-parser"),
    request             = require("request"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    user                = require("./models/user"),
    seedDB              = require("./seeds"),
    campgroundRoutes    = require("./routes/campgrounds"),
    commentsRoutes      = require("./routes/comments"),
    indexRoutes         = require("./routes/index");
seedDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "\\public"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");

//passport configuration
app.use(require("express-session")({
    secret: "This is a test!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/", indexRoutes);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Yelp Camp Server has started on %s port %s!", host, port);    
});


