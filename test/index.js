var chai = require('chai');
var benchmark = require('micro-benchmark');
var sBox = require('../index');

chai.should();

describe('sBox() tests', function () {

    it('creates hash', function () {
        sBox('0123456789', 123).should.eq(-1255785694);
    });

    it('respects seed', function () {
        sBox('0123456789', 100500).should.eq(-4200553719);
    });

    it('creates hash from empty input', function () {
        sBox('').should.eq(0);
    });

    it('creates hash from empty input with seed', function () {
        sBox('', 123).should.eq(2091);
    });

    it('respect UTF-16', function () {
        sBox('юникод').should.eq(3985126735);
    });

    var result = benchmark.profile(function () {
        var bigString = new Array(1e3 + 1).join('a');
        return sBox(bigString, 100500);
    }, { duration: 1000, maxOperations: Infinity });

    it('benchmark: ' + (result.ops/1000).toFixed(2) + ' Kops', function () {});
});