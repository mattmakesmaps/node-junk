// Testing async.series and async.waterfall
var series = require('async').series;
var waterfall = require('async').waterfall;

function openDB(callback) {
    var dbConn = 'Opening DB Connection';
    console.log(dbConn);
    callback(null, dbConn);
}

function queryData(callback) {
    var query = 'Executing Query';
    console.log(query);
    callback(null, query);
}

function finalCallback(err, results) {
    if (err) {
        console.log('ERROR: ${err}');
    }
    console.log(results);
}

series([openDB, queryData], finalCallback);

// The first function acts as a kickstart.
// Rather then passing args in the `waterfall method`, 
// the first function sets the inital number that will be
// modified by all the other subsequent functions.
function addTwo(callback) {
    var result = 2;
    callback(null, result);
}

function timesFour(number, callback) {
    var result = number * 4;
    callback(null, result);
}

function minusThree(number, callback) {
    var result = number - 3;
    callback(null, result);
}

waterfall([addTwo, timesFour, minusThree], finalCallback);