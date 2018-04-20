var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://nsb007:qwertyuiop@ds053688.mlab.com:53688/dname';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
var insertDocument = function(db, data, callback) {
    db.collection('cname').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};
var login = function(db,data,callback) {
    console.log(data);
    var cursor = db.collection('cname').find({"email":data.mail,"password":data.pw});//go to rest.html
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
}
app.post('/login',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var cursor = db.collection('cname').find({"email":req.body.mail,"password":req.body.pw});//go to rest.html
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            console.log(doc);
            if (doc != null) {
                res.write("success");
                res.end();
            } else {
                res.write("error");
                res.end();
            }
        });
    });
});
app.post('/find',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var cursor = db.collection('cname').find({"email":req.body.mail});//go to rest.html
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            console.log(doc);
            if (doc != null) {
                res.write(doc);
                res.end();
            } else {
                res.write("error");
                res.end();
            }
        });
    });
});
app.post('/update', function ( req,res){

    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};
        var newData={};

        if(req.body.mail){
            find = req.body.mail;
        }
        if(req.body.fname){
            newData.fname = req.body.fname;
        }
        if(req.body.lname){
            newData.lname = req.body.lname;
        }

        if(req.body.passsword){
            newData.password = req.body.password;
        }

        db.collection('cname').update(find,{'$set':newData},
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });

});
app.post('/delete', function ( req,res){

});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

