//https://blog.yld.io/2015/12/15/using-an-event-emitter/#.WRkZjGgrI2w
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var inside = require('point-in-polygon');
var iss = require('iss');

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
    } else {
        this.emit('outside');
    }
}

Piper.prototype.trackISS = function() {
    // `self` can be passed to callback of stream.on('data') event
    // to give access to Piper methods.
    var self = this;
    var stream = iss.locationStream(25544, 10);
    
    stream.on('data', function (buffer) {
        var rawJson = buffer.toString('utf8')
        var data = JSON.parse(rawJson);
        self.pip([data.longitude, data.latitude]);
    });
}