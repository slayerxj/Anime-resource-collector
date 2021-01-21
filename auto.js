var Database = require("./database.js");
var sites = require("./websites/index.js");

var database = new Database();
database.initialize().rank();

Object.keys(sites).forEach(function (domain) {
    sites[domain].fetchNew(database, function () {
        database.rankAll();
        database.updateRecord();
    });
});
