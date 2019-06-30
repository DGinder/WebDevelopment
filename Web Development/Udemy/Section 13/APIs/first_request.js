const request = require('request');
request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
    if(!error && response.statusCode == 200){
        const parsedData = JSON.parse(body);
        for(var i = 0; i < Object.keys(parsedData).length; i++){
            console.log(parsedData[i].name);
        }
    }
});