var request = require("superagent");

var urlQueue = [];
var concurrencyCount = { value: 0 };
var doWhenFinish = null;

var fetchUrl = function (url, callback) {
    concurrencyCount.value++;
    console.log((new Date().getTime()), "Start fetching: ", url);
    request
        .get(url)
        .retry(2)
        .end(function (err, res) {
            concurrencyCount.value--;
            console.log(url, "is loaded");
            callback(res.text);
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
    if (concurrencyCount.value === 0) {
        if (urlQueue.length > 0) {
            var fetchPack = urlQueue.shift();

            var makeCallback = function (fetchPack) {
                return function (res) {
                    if (res === "Get the origin callback") {
                        return fetchPack.callback;
                    }
                    fetchPack.callback(res);

                    if ((concurrencyCount.value === 0) && (urlQueue.length === 0)) {
                        if (doWhenFinish) {
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
    } else {
        setTimeout(continueFetchingUrls, 5000);
    }
};

module.exports = {
    pushUrlToQueue,
    startFetchingUrls
}