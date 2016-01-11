var request = require("superagent");

var urlQueue = [];
var concurrencyCount = { value: 0 };
var urlFailCount = {};
var failedUrl = [];
var doWhenFinish = null;

var retry = 5;
var maxConcurrencyNum = 10;

var increaseFailCount = function (url) {
    if (urlFailCount[url]) {
        urlFailCount[url]++;
    } else {
        urlFailCount[url] = 1;
    }
};

var handleFetchUrlFailed = function (url, callback) {
    increaseFailCount(url);

    if (urlFailCount[url] < retry) {
        if (urlQueue.length === 0) {
            fetchUrl(url, callback);
        } else {
            pushUrlToQueue(url, callback("Get the origin callback"));
        }
    } else {
        (callback("Get the origin callback"))("err");
        failedUrl.push(url);
    }
};

var fetchUrl = function (url, callback) {
    concurrencyCount.value++;
    request
        .get(url)
        .end(function (err, res) {
            concurrencyCount.value--;
            if (err) {
                handleFetchUrlFailed(url, callback);
            } else {
                console.log(url, "is loaded");
                callback(res.text);
            }
        });
};

var pushUrlToQueue = function (url, callback) {
    urlQueue.push({ url, callback });
    if (concurrencyCount.value === 0) {
        continueFetchingUrls();
    }
};

var startFetchingUrls = function(finish) {
    doWhenFinish = finish;
    continueFetchingUrls();
};

var continueFetchingUrls = function () {
    while ((urlQueue.length > 0) && (concurrencyCount.value < maxConcurrencyNum)) {
        var fetchPack = urlQueue.shift();

        var makeCallback = function (fetchPack) {
            return function (res) {
                if (res === "Get the origin callback") {
                    return fetchPack.callback;
                }
                fetchPack.callback(res);

                if ((concurrencyCount.value === 0) && (urlQueue.length === 0)) {
                    if (failedUrl.length > 0) {
                        console.log("The following url(s) is failed");
                        failedUrl.forEach(function (url) {
                            console.log(url);
                        });
                    }
                    if (doWhenFinish) {
                        doWhenFinish();
                        doWhenFinish = null;
                    }
                }
                continueFetchingUrls();
            };
        };
        fetchUrl(fetchPack.url, makeCallback(fetchPack));
    }
};

module.exports = {
    pushUrlToQueue,
    startFetchingUrls
}