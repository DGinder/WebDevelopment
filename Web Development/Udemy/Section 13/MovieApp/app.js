var apikey = "&apikey=thewdb" 
var express = require("express"),
    app = express();
var request = require("request");
app.set("view engine", "ejs");



app.get("/", (req, res) => {
    res.render("search");
})

app.get("/results", (req, res) => {
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + search + apikey
    request(url, (error, response, body) => {
        const parsedData = JSON.parse(body)
        if(!error && response.statusCode == 200){
            res.render("results", {data: parsedData.Search})
        }
    });
})




var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Movie app has started on %s port %s!", host, port)    
})