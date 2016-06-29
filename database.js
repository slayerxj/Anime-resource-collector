var fs = require("fs");
var Item = require("./item.js");
var rank = require("./rank.js");
var urlFetcher = require("./urlFetcher.js");

function Database() {
    this.content = [];
    this.contentValidation = [];
    this.contentMap = {};
    this.latest = null;
}

Database.prototype.initialize = function () {
    var record = require("./record/result.js");

    for (var index = 0; index < record.length; index++) {
        var item = Item.initialize(record[index]);
        this.content.push(item);
        this.contentValidation.push(true);
        this.contentMap[item.getKey()] = item;
    }

    return this;
};

Database.prototype.insert = function (item) {
    if (!item) {
        return false;
    }

    if (this.contentMap[item.getKey()]) {
        return false;
    } else {
        item.isNew = true;
        this.content.push(item);
        this.contentValidation.push(true);
        this.contentMap[item.getKey()] = item;
        return true;
    }
};

Database.prototype.rank = function () {
    var unrankedItems = this.content.filter(function (item) {
        return item.isUnranked();
    });

    rank(unrankedItems);
    this.content.sort(Item.sort);

    return this;
};

Database.prototype.rankAll = function () {
    rank(this.content);
    this.content.sort(Item.sort);

    return this;
};

Database.prototype.updateRecord = function () {
    // Record is maintained in Database Class, should split out
    fs.writeFile("record/result.js", "module.exports = " + JSON.stringify(this.content, null, "\n"), function (err) {
        if (err) {
            throw err;
        }
    });

    return this;
};

module.exports = Database;