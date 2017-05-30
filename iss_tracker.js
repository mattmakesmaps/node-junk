const EventEmitter = require('events').EventEmitter;
const inside = require('point-in-polygon');
const iss = require('iss');
// Converts "classic" style streams to pipeable v2 streams.
const through = require('through');

function issInsideBBOX(bbox) {
    // For the calling code to listen to events, need to create
    // new EventEmitter instance, which this function returns.
    const eeInstance = new EventEmitter();
    let stream = iss.locationStream(25544, 10);

    // Note use of `bind` to pass context
    stream.pipe(through(read.bind(this), end));

    function read(buffer) {
        let rawJson = buffer.toString('utf8');
        let data = JSON.parse(rawJson);
        let inBBOX = inside([data.longitude, data.latitude], bbox);
        data.inside = inBBOX;

        if (inBBOX) {
            eeInstance.emit('inside', data);
        } else {
            eeInstance.emit('outside', data);
        }
    }

    function end() {
        console.log('Stream END Event Fired!');
    }

    return eeInstance;
}

module.exports = issInsideBBOX;