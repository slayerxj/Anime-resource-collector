var request = require("superagent");

var urlQueue = [];
var concurrencyCount = { value: 0 };
var urlFailCount = {};
var failedUrl = [];
var doWhenFinish = null;

var retry = 7;
var maxConcurrencyNum = 2;

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
        failedUrl.push(url);
        callback("err");
    }
};

var fetchUrl = function (url, callback) {
    concurrencyCount.value++;
    console.log("Start fetching", url);
    request
        .get(url)
        .timeout(5000)
        .end(function (err, res) {
            concurrencyCount.value--;
            if (err) {
                handleFetchUrlFailed(url, callback);
            } else {
                console.log("          ", url, "is loaded");
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

var startFetchingUrls = function (finish) {
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
                    } else if (doWhenFinish) {
                        doWhenFinish();
                        doWhenFinish = null;
                    }
                } else {
                    continueFetchingUrls();
                }
            };
        };
        fetchUrl(fetchPack.url, makeCallback(fetchPack));
    }
};

module.exports = {
    pushUrlToQueue,
    startFetchingUrls
}