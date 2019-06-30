var friends = ["Josiah", "Nate", "Brent", "Milton", "Bryce"];

var express = require("express"),
    app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render(("home"))
})

app.post("/addfriend", function(req, res)
{
    var newfriend = req.body.addfriend
    if(newfriend != ""){
        friends.push(newfriend);
    }
    
    res.redirect("/friends")
})

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends})
})


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Serving on %s port %s!", host, port)    
})