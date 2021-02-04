var fs = require("fs");
var record = require("./result");
record.forEach((item) => {
  item.name = item.name.trim();
})
fs.writeFile(
  "result.js",
  "module.exports = " + JSON.stringify(record),
  function (err) {
    if (err) {
      throw err;
    }
  }
);