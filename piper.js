//https://blog.yld.io/2015/12/15/using-an-event-emitter/#.WRkZjGgrI2w
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var inside = require('point-in-polygon');
var iss = require('iss');
// Converts "classic" style streams to pipeable v2 streams.
var through = require('through');

module.exports = Piper;

function Piper(test_poly) {
    this.test_poly = test_poly;
    EventEmitter.call(this);
}

inherits(Piper, EventEmitter);

Piper.prototype._testPip = function(inPoint) {
    return(inside(inPoint, this.test_poly));
}

Piper.prototype.pip = function(inPoint) {
    if (this._testPip(inPoint)) {
        this.emit('inside');
        return true;
    } else {
        this.emit('outside');
        return false;
    }
}

Piper.prototype.trackISS = function(timeout_ms, callback) {
    var stream = iss.locationStream(25544, 10);

    // Kill stream if timeout is specified.
    if (timeout_ms){
        setTimeout(function(){stream.finished = true;}, timeout_ms);
    }

    // Note use of `bind` to pass context
    stream.pipe(through(read.bind(this), end));

    function read(buffer) {
        var rawJson = buffer.toString('utf8');
        var data = JSON.parse(rawJson);
        var inside = this.pip([data.longitude, data.latitude]);
        data.inside = inside;
        if (callback) {
            callback(data);
        }
    }

    function end() {
        console.log('Stream END Event Fired!');
    }

}