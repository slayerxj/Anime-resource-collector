var request = require("superagent");

var urlQueue = [];
var concurrencyCount = { value: 0 };
var urlFailCount = {};
var overallFailCount = 0;
var failedUrl = [];
var pause = false;
var doWhenFinished = null;

var retry = 5;
var overallRetry = 20;
var maxConcurrencyNum = 10;
var restTime = 15 * 1000;

var increaseFailCount = function (url) {
    if (urlFailCount[url]) {
        urlFailCount[url]++;
    } else {
        urlFailCount[url] = 1;
    }

};

var increaseOverallFailCount = function () {
    overallFailCount++;

    if (overallFailCount > overallRetry) {
        pauseFetchingUrls();
        setTimeout(continueFetchingUrls, restTime);
        overallFailCount = 0;
    }
};

var handleFetchUrlFailed = function (url, callback) {
    increaseFailCount(url);
    increaseOverallFailCount();

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
}

var pauseFetchingUrls = function () {
    pause = true;
};

var continueFetchingUrls = function () {
    pause = false;
    startFetchingUrls();
};

var startFetchingUrls = function (finish) {
    while ((urlQueue.length > 0) && (concurrencyCount.value < maxConcurrencyNum) && (pause === false)) {
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
                    if (finish) {
                        finish();
                    }
                }
                startFetchingUrls(finish);
            };
        };
        fetchUrl(fetchPack.url, makeCallback(fetchPack));
    }
};

module.exports = {
    pushUrlToQueue,
    startFetchingUrls
}