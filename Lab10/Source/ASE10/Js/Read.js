/**
 * Created by NSB on 11/8/16.
 */
/*
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://nsb007:qwertyuiop@ds053688.mlab.com:53688/dname';
var findUser = function(db, callback) {
    var cursor =db.collection('cname').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
var findUserwithName = function(db,callback) {
    var cursor = db.collection('cname').find({"fname":formdata.fname});//go to rest.html
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            console.log("Last Name:" + doc.lname);
        }
    });
}
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findUserwithUniversity(db, function() {
        db.close();
    });
});