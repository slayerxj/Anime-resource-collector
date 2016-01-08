var util = require('../util.js');
var should = require('should');

describe("Test File: util.js", function () {
    describe("Test Method: sliceString", function () {
        it("Case 1: Common", function () {
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

    describe("Test Method: isWorthCreateNewItem", function () {
        it("Case 1: Common pass", function () {
            var originString = "Still World is Beautiful 尽管如此世界依然美丽 BDRIP GB 720P x264 AAC MP4";
            util.isWorthCreateNewItem(originString).should.equal(true);
        });

        it("Case 2: Common fail", function () {
            var originString = "【動漫國字幕組】[亞人 劇場版][01_衝動][720P][繁體][MP4]";
            util.isWorthCreateNewItem(originString).should.equal(false);
        });
    });
});