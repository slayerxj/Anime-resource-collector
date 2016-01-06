var util = require('../util.js');
var should = require('should');

describe("test/util.test.js", function () {
    it("Case 1: common", function () {
        var originString = "Apple is usually heavier than orange.";
        var beforeString = "usually ";
        var afterString = " than";
        util.sliceString(originString, beforeString, afterString).should.equal("heavier");
    });

    it("Case 2: Before string appears twice", function () {
        var originString = "Apple is usually heavier than orange, so I usually buy apples";
        var beforeString = "usually ";
        var afterString = " than";
        util.sliceString(originString, beforeString, afterString).should.equal("heavier");
    });

    it("Case 3: After string appears twice", function () {
        var originString = "Apple is usually heavier than orange, I love apples more than orange.";
        var beforeString = "usually ";
        var afterString = " than";
        util.sliceString(originString, beforeString, afterString).should.equal("heavier");
    });

    it("Case 4: Before and after string appears twice", function () {
        var originString = "Apple is usually heavier than orange, and apple is usually sweeter than orange.";
        var beforeString = "usually ";
        var afterString = " than";
        util.sliceString(originString, beforeString, afterString).should.equal("heavier");
    });

    it("Case 5: No before string", function () {
        var originString = "Apple is heavier than orange.";
        var beforeString = "usually ";
        var afterString = " than";
        util.sliceString(originString, beforeString, afterString).should.equal("");
    });
    
    it("Case 6: No after string", function () {
        var originString = "Apple is usually heavier compared with orange.";
        var beforeString = "usually ";
        var afterString = " than";
        util.sliceString(originString, beforeString, afterString).should.equal("");
    });
});