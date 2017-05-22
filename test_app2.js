var Piper = require('./piper.js');
var DBTools = require('./db_tools.js')

var db_url = 'mongodb://localhost:27017/test';
var iss_db = new DBTools(db_url);

var test_polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
var world_polygon = [ [-145, -73  ], [ -145, 81 ], [ 107, 81 ], [ 107, -73 ] ];
var myPip = new Piper(world_polygon);

// -145,-73,124,81
// Left,Bottom,Right,Top

myPip.on('inside', function() {
    console.log('ISS Inside Box!');
});

myPip.on('outside', function() {
    console.log('ISS Outside Box!');
});

myPip.trackISS(null, function(data) {
    var doc = [
        {'type': "Point",
        'coordinates': [ data.longitude, data.latitude],
        'inside': data.inside,
        'timestamp': data.timestamp}
    ];
    iss_db.insert_data(doc);
});