var fs = require("fs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Database = require("./database.js");
var generatePage = require("./pageGenerater.js");
var sites = require("./websites/index.js");

var isRegen = (process.argv[2] === "r");
var database = new Database();

// if (isRegen) {
//     var domain = "http://www.kisssub.org/";
//     database.regenerate(domain, function () {
//         database.rank();
//         database.updateRecord();
//     });
// } else {
database.initialize().rank();

app.use(express.static("public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/mainPage.html');
});

io.on('connection', function (socket) {
    socket.on('page load', function () {
        console.log("receive page load");

        var insertString = generatePage(database.content);
        console.log("emit update message");
        io.emit('update message', insertString);

        Object.keys(sites).forEach(function (domain) {
            sites[domain].fetchNew(database, function () {
                database.rank();
                insertString = generatePage(database.content);
                console.log("emit update message again");
                io.emit('update message', insertString);
                database.updateRecord();
            });
        });
    });

    socket.on('filter', function (object) {
        console.log("receive require filter");
        var newItems = database.content.slice();
        if (object.isOnlyNew) {
            newItems = newItems.filter(function (item) {
                return item.isNew;
            });
        }

        if (object.isOnlyCom) {
            newItems = newItems.filter(function (item) {
                return item.isComplete;
            });
        }
        var insertString = generatePage(newItems);
        console.log("emit update message");
        io.emit('update message', insertString);
    });
});
// }

http.listen(3000, function () {
    console.log('listening on *:3000');
});
