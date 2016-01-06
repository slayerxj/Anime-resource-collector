var library = require('./library.js');

var permittedFormats = library.getFormatAliases();
var upperPermittedFormats = permittedFormats.map(function (cur) {
    return cur.toUpperCase();
});

var isWorthCreateNewItem = function (text) {
    return (upperPermittedFormats.some(function (format) {
        return (text.toUpperCase().indexOf(format) !== -1);
    }));
};

var sliceString = function (wholeString, before, after) {
    var indexBefore = wholeString.indexOf(before);
    var indexAfter = wholeString.indexOf(after, indexBefore);
    if ((indexBefore === -1) || (indexAfter === -1)) {
        return "";
    } else {
        return wholeString.slice(indexBefore + before.length, indexAfter);
    }
}

module.exports = {
    isWorthCreateNewItem: isWorthCreateNewItem,
    sliceString: sliceString
};