var express = require("express"),
    app = express();

// "/" => "Hi There!"
app.get("/", function(req, res){
    res.send("Hi there!");
})

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
})

// "/dog" => "Meow!"
app.get("/dog", function(req, res){
    res.send("Meow!");
})

var server = app.listen( function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Serving on %s port %s!", host, port)    
})