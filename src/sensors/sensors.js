"use strict";
exports.__esModule = true;
var assert = require('assert');
var worker_threads_1 = require("worker_threads");
var channelToMain;
// get port to main thread
worker_threads_1.parentPort.once('message', function (value) {
    console.log('VALUE', value);
    assert(value.hereIsYourPort instanceof worker_threads_1.MessagePort);
    channelToMain = value.hereIsYourPort;
    channelToMain.postMessage('worker is running');
});
// testing !!
setInterval(function () {
    channelToMain.postMessage('buzz');
}, 5000);
process.on('exit', function () {
    channelToMain.close();
});
