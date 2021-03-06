var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

module.exports = DBTools;

function DBTools(url) {
    this.url = url;
}

DBTools.prototype._connect = function(err, callback) {
    if (!err) {
        MongoClient.connect(this.url, function(err, db) {
            assert.equal(null, err);
            callback(null, db);
            db.close();
        });
    }
    else {
        console.log(err);
    }
}

DBTools.prototype.insert_data = function(documents, callback) {
    this._connect(null, function(err, db) {
        if (!err) {
            var collection = db.collection('iss_positions');
            collection.insertMany(documents, function(err, result) {
                if (callback) {
                    callback(result);
                }
            })
        }
        else {
            console.log(err);
        }
    });
}