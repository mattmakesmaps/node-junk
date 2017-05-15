//https://blog.yld.io/2015/12/15/using-an-event-emitter/#.WRkZjGgrI2w
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var inside = require('point-in-polygon');

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
    }
}