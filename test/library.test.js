var library = require('../library.js');
var should = require('should');

describe("Test File: library.js", function () {
    describe("Test Method: getUnifiedName", function () {
        it("Case 1: Common pass 1", function () {
            library.getUnifiedName("Sound!Euphonium").should.equal("響け！ユーフォニアム");
        });

        it("Case 1: Common pass 2", function () {
            library.getUnifiedName("Sound!EupHOnium").should.equal("響け！ユーフォニアム");
        });
    });
    
    describe("Test Method: getPreferedWorks", function () {
        it("Case 1: Common pass", function () {
            library.getPreferedWorks()[1].should.equal("ニセコイ");
        });
    });
});