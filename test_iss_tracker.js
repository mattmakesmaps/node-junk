// Test the execution of `iss_tracker.js` (a module that exports a function)
const iss_tracker = require('./iss_tracker.js');

let test_polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
let world_polygon = [ [-145, -73  ], [ -145, 81 ], [ 107, 81 ], [ 107, -73 ] ];

iss_tracker(test_polygon)
    .on('inside', (data) => {
        console.log('ISS INSIDE BOX!');
        console.log(data);
    })
    .on('outside', (data) => {
        console.log('ISS OUTSIDE BOX!');
        console.log(data);
    });

