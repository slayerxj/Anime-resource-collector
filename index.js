var fs = require("fs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var library = require("./library.js");
var Database = require("./database.js");
var generatePage = require("./pageGenerater.js");
var sites = require("./websites/index.js");

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
        io.emit('update list', library.getPreferedWorks());

        Object.keys(sites).forEach(function (domain) {
            sites[domain].fetchNew(database, function () {
                database.rankAll();
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

        if (object.preferedWork) {
            newItems = newItems.filter(function (item) {
                return (item.workName == object.preferedWork);
            });
        }

        var insertString = generatePage(newItems);
        io.emit('update message', insertString);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
