var fs = require("fs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Database = require("./database.js");
var generatePage = require("./pageGenerater.js");
var sites = require("./websites/index.js");

var isReRank = (process.argv[2] === "rr");

var database = new Database();
database.initialize().rank();

app.use(express.static("public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/mainPage.html');
});

io.on('connection', function (socket) {
    socket.on('page load', function () {

        var insertString = generatePage(database.content);
        io.emit('update message', insertString);

        Object.keys(sites).forEach(function (domain) {
            sites[domain].fetchNew(database, function () {
                if (isReRank) {
                    database.rankAll();
                } else {
                    database.rank();
                }
                insertString = generatePage(database.content);
                io.emit('update message', insertString);
                database.updateRecord();
            });
        });
    });

    socket.on('filter', function (object) {
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
        io.emit('update message', insertString);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
