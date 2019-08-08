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
    seedDB              = require("./seeds");
    //user            = require("./models/user");
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


app.get("/", (req, res) => {
    res.render("landing");
})

//Restful INDEX Campground
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgroundData) => {
        if(err){
            console.log("Oh No Error");
            console.log(err)
        }else{
            res.render("./Campgrounds/index", {data: campgroundData});
        }
    })
})

//Restful CREATE Campground
app.post("/campgrounds", (req, res) => {
    req.body.name = req.sanitize(req.body.name);
    req.body.description = req.sanitize(req.body.description);
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, (err, campground) => {
        if(err){
            console.log(err)
        }
        else{
            console.log("New Campground")
            console.log(campground)
        }
    })

    res.redirect("/campgrounds");
})


//Restful NEW Campground
app.get("/campgrounds/new", (req, res) => {
    res.render("./Campgrounds/new.ejs");
})

//Restful SHOW Campground
app.get("/campgrounds/:id", (req, res) => {
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
        }else{
            res.render("./Campgrounds/show", {campground: foundCampground});
        }
    });
});

//===================
//Comments Route    =
//===================

//Restful New Comment
app.get("/campgrounds/:id/comments/new", (req, res) => {
    
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
        }else{
            //render campground
            res.render("./Comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments/", (req, res) => {
    
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err);
            res.render("/campgrounds");
        }else{
            req.body.comment.text = req.sanitize(req.body.comment.text);
            //render campground
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    //if error
                    console.log("Oh No Error");
                    console.log(err);
                    res.render("/campgrounds");
                }
                else{
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            });
        }
    });
});

//Authentication Routes
//register form
app.get("/register", (req, res) => {
    res.render(("./User/register"));
});

//signup logic
app.post("/register", (req, res) => {
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.render(("./User/register"));
        }
        console.log(user)
        passport.authenticate("local")(req, res, function(){
            res.redirect('/campgrounds');
        })
    });
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Yelp Camp Server has started on %s port %s!", host, port)    
});


