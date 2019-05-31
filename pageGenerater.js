var stars = [
    "&#9733;&#9733;&#9733;&#9733;&#9733;",
    "&#9733;&#9733;&#9733;&#9733;",
    "&#9733;&#9733;&#9733;",
    "&#9733;&#9733;",
    "&#9733;"
];

var convertToTimeString = function (date) {
    return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
};

var assembleString = function (items) {
    return "<tr><th>Time</th><th>Title</th><th>Rank</th><th>Download</th></tr>" +
        items.reduce(function (pre, cur) {
            var head;
            if (cur.isNew) {
                head = pre + "<tr class='new'>";
            } else {
                head = pre + "<tr>";
            }
            return head +
                "<td>" + convertToTimeString(cur.publishTime) + "</td>" +
                // "<td><a href='" + cur.url + "'>" + cur.name + "</a></td>" +
                "<td>" + cur.name + "</td>" +
                "<td>" + stars[cur.generalRanking] + "</td>" +
                "<td><a href='" + cur.magnetLink + "'>" + "link" + "</a></td>" +
                "</tr>";
        }, "");
};

module.exports = assembleString;