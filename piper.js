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
    } else {
        this.emit('outside');
    }
}

Piper.prototype.trackISS = function() {
    var stream = iss.locationStream(25544, 10);
    
    /**
     * Begin Stream V1 Example, which passes context using `var self = this;`
     * 
     * var self = this;
     * stream.on('data', function (buffer) {
     *   var rawJson = buffer.toString('utf8')
     *     var data = JSON.parse(rawJson);
     *     selfpip([data.longitude, data.latitude]);
     * }); 
     */

    /**
     * Stream V2 API using `through`
     */

    // Note use of `bind` to pass context
    stream.pipe(through(read.bind(this), end));

    function read(buffer) {
        var rawJson = buffer.toString('utf8')
        var data = JSON.parse(rawJson);
        this.pip([data.longitude, data.latitude]);
    }

    function end() {
        console.log('end');
    }

}