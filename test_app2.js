var Piper = require('./piper.js');

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

// myPip.pip([1.8, 1.8]);
myPip.trackISS();