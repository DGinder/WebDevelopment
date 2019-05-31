var express = require("express"),
    app = express();

//specific pages
// "/" => "Hi There!"
app.get("/", function(req, res){
    res.render("home.ejs");
})


app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing
    res.render("love.ejs", {thingVar: thing});
})

//pattern pages and route parameters
app.get("/r/:Name", function (req, res) {
    var Name = req.params.Name
    res.send("Welcome to the " + Name + " Subreddit")
})

app.get("/r/:Name/comments/:id/:title", function (req, res) {
    var Name = req.params.Name;
    var id = req.params.id;
    var title = req.params.title;

    res.send("Welcome to the " + title + " comment of the " + Name + " Subreddit")
})



//generic page
app.get("*", function(req, res){
    res.send("RATS A ERA UOY");
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Serving on %s port %s!", host, port)    
})