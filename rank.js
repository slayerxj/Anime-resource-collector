var library = require("./library.js");

var formatAliases = library.getFormatAliases().map(function (cur) { return cur.toUpperCase() });
var workNames = library.getWorkNames().map(function (cur) { return cur.toUpperCase() });
var subtitleProviders = library.getSubtitleProviders().map(function (cur) { return cur.toUpperCase() });
var completeAliases = library.getCompleteAliases().map(function (cur) { return cur.toUpperCase() });

var stringFilter = function (items, words) {
    var validItems = [];
    var leftItems = [];

    for (var i = 0; i < items.length; i++) {
        var upperItemName = items[i].name.toUpperCase();
        for (var j = 0; j < words.length; j++) {
            if (upperItemName.indexOf(words[j]) !== -1) {
                validItems.push(items[i]);
                break;
            }
        }

        if (validItems[validItems.length - 1] !== items[i]) {
            leftItems.push(items[i]);
        }
    }

    return {
        valid: validItems,
        left: leftItems
    };
};

var rank = function (item, lines) {
    item.generalRanking = 4;
    var upperItemName = item.name.toUpperCase();

    if (workNames.some(function (cur) {
        if (upperItemName.indexOf(cur) !== -1) {
            item.workName = library.getUnifiedName(cur);
            return true;
        } else {
            return false;
        }
    })) {
        item.generalRanking--;
    }

    if (subtitleProviders.some(function (cur) {
        return (upperItemName.indexOf(cur) !== -1);
    })) {
        item.generalRanking--;
    }

    item.isComplete = false;
    if (completeAliases.some(function (cur) {
        return (upperItemName.indexOf(cur) !== -1);
    })) {
        item.isComplete = true;
        item.generalRanking--;
    }

    item.generalRanking--;
    if (upperItemName.indexOf("720") !== -1) {
        item.resolution = "720p";
        item.generalRanking++;
    }
};

module.exports = function (items) {
    var start = new Date();
    var startTime = start.getTime();
    var splitItems = stringFilter(items, formatAliases);
    splitItems.valid.forEach(function (item) {
        rank(item);
    });
    var end = new Date();
    var endTime = end.getTime();
    console.log("Item number:", items.length, ". Rank used time (ms):", endTime - startTime);
};