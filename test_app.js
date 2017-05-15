var Piper = require('./piper.js');

var test_polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
var myPip = new Piper(test_polygon);

myPip.on('inside', function() {
    console.log('Event Listener Caught This!');
})

var test_polygon2 = [ [ 4, 4 ], [ 4, 8 ], [ 8, 8 ], [ 8, 4 ] ];
var myPip2 = new Piper(test_polygon2);

myPip2.on('inside', function() {
    console.log('myPip2 listener got this.');
});

// Internal Method returns True
console.log(myPip._testPip([1.5, 1.5]));
// Public Method doesn't return anything, but fires and event.
console.log(myPip.pip([1.5, 1.5]));

myPip.on('inside', function() {
    console.log('myPip Listener 2 Got it');
});

console.log(myPip2._testPip([5, 6]));
myPip2.pip([5, 6]);

// Let's see if second event handler fires.
myPip.pip([1.5, 1.5]);