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
    image: String,
    description: String
});
var campgroundModel = mongoose.model("Campground", campgroundSchema);

// campgroundModel.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description: "This is a huge granite hill. No bathrooms. No water. Beutiful granite!"
//     },
//     (err, campground) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("New Campground:");
//             console.log(campground);
//         }
//     }
// );

app.get("/", (req, res) => {
    res.render("landing");
})

//Restful INDEX
app.get("/campgrounds", (req, res) => {
    campgroundModel.find({}, (err, campgroundData) => {
        if(err){
            console.log("Oh No Error");
            console.log(err)
        }else{
            res.render("index", {data: campgroundData});
        }
    })
})

//Restful CREATE
app.post("/campgrounds", (req, res) => {
    campgroundModel.create({
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


//Restful NEW
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
})

//Restful SHOW
app.get("/campgrounds/:id", (req, res) => {
    //find campground with id
    campgroundModel.findById(req.params.id, (err, foundCampground) => {
        if(err){
            //if error
            console.log("Oh No Error");
            console.log(err)
        }else{
            //render campground
            res.render("show", {campground: foundCampground});
        }
    })
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Yelp Camp Server has started on %s port %s!", host, port)    
});


