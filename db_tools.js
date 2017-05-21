var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

module.exports = DBTools;

function DBTools(url) {
    this.url = url;
}

DBTools.prototype._connect = function(err, callback) {
    if (!err) {
        MongoClient.connect(this.url, function(err, db) {
            //mk note: maybe i need to install assert lib
            assert.equal(null, err);
            callback();
            // console.log("Connected correctly to server.");
            db.close();
        });
    }
    else {
        console.log('ERROR!');
    }
}

DBTools.prototype.insert_data = function(err, documents, callback) {

    // this._connect(null, insert_data(documents));

    // function _insert_data(documents) {
    //     // INSERT DATA
    // }
}