var event = require('./event');

if (typeof toolkit === "undefined") window.toolkit = {};
if (typeof window.define === "function" && window.define.amd) {
    define('bower_components/bskyb-event/dist/js/event.toolkit', [], function() {
        'use strict';
        return event;
    });
} else {
    toolkit.event = event;
}