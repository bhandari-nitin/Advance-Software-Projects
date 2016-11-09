/**
 * Created by NSB on 11/8/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://nsb007:qwertyuiop@ds053688.mlab.com:53688/dname';
var deleteUser = function(db, callback,res, req) {

    db.collection('restaurants').deleteOne(
        { "mail": res.body.mail },
        function(err, results) {
            console.log(results);
            callback();
        }

    );
    $window.location.href = "/ASE10/signup.html";
};



var updateRestaurants = function(db, callback) {
    $window.location.href = "/ASE10/signup.html";
    db.collection('cname').updateOne(
        { "fname" : "Arunit" },
        {
            $set: { "mail": res.body.mail },
            $set: { "password": res.body.pw },
            $currentDate: { "lastModified": true }
        }, function(err, results) {
            console.log(results);
            callback();
        });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    updateRestaurants(db, function() {
        db.close();
    });
});