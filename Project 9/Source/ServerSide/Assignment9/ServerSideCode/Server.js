
var express = require('express');
var app = express();
var request = require('request');
app.get('/restServices/item', function (req, res) {
    var result;
    var farm;
    var id;
    var secret = null;
    var server = null;
    var name = null;
    var price = 0;
    var itemId = 0;

    request('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4605dbc7335582d5dae239562aca6906&text=laptop&per_page=1&format=json&nojsoncallback=1', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200) {

            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        body = JSON.parse(body);
        result = JSON.stringify({'photoid': body.photos.photo[0].id,
            'farm':body.photos.photo[0].farm,
            'server':body.photos.photo[0].server,
            'secret':body.photos.photo[0].secret});
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
    });
    console.log(result);

    request('http://api.walmartlabs.com/v1/search?query=laptop&format=json&apiKey=q5kcy3uubxtbh6btjq5mtraq&numItems=1&sort=bestseller', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200) {

            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        bodywallmart = JSON.parse(bodywallmart);
        result = JSON.stringify({'Itemid': bodywallmart.item[0].id,
            'farm':bodywallmart.item[0].farm,
            'server':bodywallmart.item[0].server,
            });
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
    });


})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Assignment9 listening at http://%s:%s", host, port)
})