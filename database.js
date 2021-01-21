var fs = require("fs");
var Item = require("./item.js");
var rank = require("./rank.js");

class Database {
    constructor() {
        this.content = [];
        this.contentMap = {};
        this.latest = null;
    }
    initialize() {
        var record = require("./record/result.js");
        var latest = require("./record/latest.js");
        for (var index = 0; index < record.length; index++) {
            var item = Item.initialize(record[index]);
            this.content.push(item);
            this.contentMap[item.getKey()] = item;
        }
        this.latest = latest;
        return this;
    }
    loadArchieve() {
        var archieve = require("./record/archive.js");
        for (var index = 0; index < archieve.length; index++) {
            var item = Item.initialize(archieve[index]);
            this.content.push(item);
            this.contentMap[item.getKey()] = item;
        }
        return this;
    }
    insert(item) {
        if (!item) {
            return false;
        }
        if (this.contentMap[item.getKey()]) {
            return false;
        }
        else {
            item.isNew = true;
            this.content.push(item);
            this.contentMap[item.getKey()] = item;
            return true;
        }
    }
    rank() {
        var unrankedItems = this.content.filter(function (item) {
            return item.isUnranked();
        });
        rank(unrankedItems);
        this.content.sort(Item.sort);
        return this;
    }
    rankAll() {
        rank(this.content);
        this.content.sort(Item.sort);
        return this;
    }
    setLatest() {
        var latest = this.content[0];
        var latestTime = latest.publishTime.getTime();
        this.content.map(function (item) {
            if (item.publishTime.getTime() > latestTime) {
                latest = item;
                latestTime = latest.publishTime.getTime();
            }
        });
        this.latest = latest;
    }
    updateRecord() {
        // Record is maintained in Database Class, should split out
        this.setLatest();
        fs.writeFile("record/result.js", "module.exports = " + JSON.stringify(this.content, null, "\n"), function (err) {
            if (err) {
                throw err;
            }
        });
        fs.writeFile("record/latest.js", "module.exports = " + JSON.stringify(this.latest, null, "\n"), function (err) {
            if (err) {
                throw err;
            }
        });
        return this;
    }
}

module.exports = Database;