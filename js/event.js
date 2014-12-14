(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var timeout = {
    resize: null
};

var state = {    };
var browserSpecificEvents = {
    'transitionend': check('transition', 'end'),
    'animationend': check('animation', 'end')
};

function capitalise(str) {
    return str.replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
};

function check(eventName, type) {
    var result = false,
        eventType = eventName.toLowerCase() + type.toLowerCase(),
        eventTypeCaps = capitalise(eventName.toLowerCase()) + capitalise(type.toLowerCase());
    if (state[eventType]) {
        return state[eventType];
    }
    if ('on' + eventType in window) {
        result = eventType;
    } else if ('onwebkit' + eventType in window) {
        result = 'webkit' + eventTypeCaps;
    } else if ('ono' + eventType in document.documentElement) {
        result = 'o' + eventTypeCaps;
    }
    return result;
};

function bindEvents() {
    on(window, 'resize', function () {
        clearTimeout(timeout.resize);
        timeout.resize = setTimeout(emitResizeEnd, 200);
    });
};

function emitResizeEnd() {
    emit(window, 'resizeend'); // raw JS version
    if (typeof $ !== 'undefined') {
        $(window).trigger('resizeend'); // jQuery version
    }
};

function on(el, eventName, exec) {
    var browserSpecificEventName = browserSpecificEvents[eventName.toLowerCase()];
    eventName = browserSpecificEventName || eventName;
    if (el.addEventListener) {
        el.addEventListener(eventName, exec, false);
    } else {
        el.attachEvent(eventName, exec);
    }
};

function off(el, eventName, exec) {
    var browserSpecificEventName = browserSpecificEvents[eventName.toLowerCase()];
    eventName = browserSpecificEventName || eventName;
    if (el.removeEventListener) {
        el.removeEventListener(eventName, exec, false);
    } else {
        el.detachEvent('on' + eventName, exec);
    }
};

function emit(el, eventName) {
    var event;
    if (document.createEvent) {
        event = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
        event.initCustomEvent(eventName, false, false, null);
        el.dispatchEvent(event);
    } else {
        event = document.createEventObject();
        el.fireEvent('on' + eventName, event);
    }
};

function ready(exec) {
    if (/in/.test(document.readyState)) {
        setTimeout(function () {
            ready(exec);
        }, 9);
    } else {
        exec();
    }
};

bindEvents();

module.exports = {
    on: on,
    off: off,
    emit: emit,
    ready: ready
};
},{}]},{},[1]);
