//variable set up and app set up
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    request         = require("request"),
    mongoose        = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");

//mongodb schema and model
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var campgroundModel = mongoose.model("Campground", campgroundSchema);


app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/campgrounds", (req, res) => {
    campgroundModel.find({}, (err, campgroundData) => {
        if(err){
            console.log("Oh No Error");
            console.log(err)
        }else{
            res.render("campgrounds", {data: campgroundData});
        }
    })
})



app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/campgrounds", (req, res) => {
    campgroundModel.create({
        name: req.body.name,
        image: req.body.image
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


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Yelp Camp Server has started on %s port %s!", host, port)    
});