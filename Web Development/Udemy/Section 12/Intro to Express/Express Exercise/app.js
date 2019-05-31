var express = require("express"),
    app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!")
})

app.get("/speak/:Animal", function (req, res) {
    var sounds = {
        pig: " 'Oink'",
        cow: " 'Moo'",
        dog: " 'Woof Woof'"
    }
    var Animal = req.params.Animal.toLowerCase()
    res.send("The " + Animal + " makes a" + sounds[Animal]  + " noise!")
})

app.get("/repeat/:Word/:Num", function (req, res) {
    var word = req.params.Word;
    var num = req.params.Num;
    var str = ""
    for(var i = 0; i < parseInt(num); i++){
        str += word + " "
    }
    res.send(str)
})



//generic page
app.get("*", function(req, res){
    res.send("Sorry that page is not found.");
})

var server = app.listen(3000, function () {
//var server = app.listen(process.env.PORT, process.env.IP, function(req, res){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Serving on %s port %s!", host, port)    
})