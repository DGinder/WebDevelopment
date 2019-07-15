var express = require("express"),
app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var request = require("request");
app.set("view engine", "ejs");

var temp = [
    {name:"Salmon Creek", image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Yellowstone", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Other", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Salmon Creek", image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Yellowstone", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Other", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Salmon Creek", image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Yellowstone", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    {name:"Other", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"}
]

app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {data: temp});
})



app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    temp.push(newCampground);

    res.redirect("/campgrounds");
})


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Yelp Camp Server has started on %s port %s!", host, port)    
});