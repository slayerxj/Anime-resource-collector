var request = require("superagent");
var defaultConfiguration = require("./defaultConfiguration.js");

var urlQueue = [];
var concurrencyCount = { value: 0 };
var urlFailCount = {};
var overallFailCount = 0;
var failedUrl = [];
var pause = false;

var retry = defaultConfiguration.retry;
var overallRetry = defaultConfiguration.overallRetry;
var concurrencyNum = defaultConfiguration.concurrencyNum;
var restTime = defaultConfiguration.restTime;

var increaseOverallFailCount = function () {
    overallFailCount++;

    if (overallFailCount > overallRetry) {
        pauseFetchingUrls();
        setTimeout(continueFetchingUrls, restTime);
    }
};

var handleFetchUrlFailed = function (url, callback) {
    urlFailCount[url]++;

    if (urlFailCount[url] <= retry) {
        pushUrlToQueue(url, callback);
    } else {
        failedUrl.push(url);
    }
};

var fetchUrl = function (url, callback) {
    request
        .get(url)
        .end(function (err, res) {
            if (err) {
                console.log("Load", url, "is failed");
                console.log("Stack trace: ", err.stack);
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

var setup = function (urlSetting) {
    if (urlSetting.retry) {
        retry = urlSetting.retry;
    }
    if (urlSetting.overallRetry) {
        overallRetry = urlSetting.overallRetry;
    }
    if (urlSetting.concurrencyNum) {
        concurrencyNum = urlSetting.concurrencyNum;
    }
};

var startFetchingUrls = function (finish) {
    while ((urlQueue.length > 0) && (concurrencyCount.value < concurrencyNum) && (pause === false)) {
        var fetchPack = urlQueue.shift();

        var makeCallback = function (fetchPack) {
            return function (res) {
                fetchPack.callback(res);
                concurrencyCount.value--;
                if ((concurrencyCount.value === 0) && (urlQueue.length === 0)) {
                    finish();
                }
                startFetchingUrls(finish);
            };
        };
        fetchUrl(fetchPack.url, makeCallback(fetchPack));
        concurrencyCount.value++;
    }
};

module.exports = {
    pushUrlToQueue,
    startFetchingUrls
}