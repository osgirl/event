var eventRegistry = {};
var state = {    };
var browserSpecificEvents = {
    'transitionend': check('transition', 'end'),
    'animationend': check('animation', 'end')
};

function capitalise(str) {
    return str.replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
}

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
}

function off(el, eventName, eventHandler) {
    if (el.removeEventListener) {
        el.removeEventListener(eventName, eventHandler, false);
    } else {
        var browserSpecificEventName = browserSpecificEvents[eventName.toLowerCase()];
        eventName = browserSpecificEventName || eventName;
        el.detachEvent(eventName, eventHandler);
    }
}

function on(el, eventName, eventHandler, useCapture) {
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, !!useCapture);
    } else {
        var browserSpecificEventName = browserSpecificEvents[eventName.toLowerCase()];
        eventName = browserSpecificEventName || eventName;
        el.attachEvent(eventName, eventHandler);
    }
}

function contains(el, child){
    return el !== child && el.contains(child);
}

function dispatchEvent(event) {
    var targetElement = event.target;

    eventRegistry[event.type].forEach(function (entry) {
        var potentialElements = document.querySelectorAll(entry.selector);
        var hasMatch = false;
        Array.prototype.forEach.call(potentialElements, function(item){
            if (contains(item, targetElement) || item === targetElement){
                hasMatch = true;
                return;
            }
        });

        if (hasMatch) {
            entry.handler.call(targetElement, event);
        }
    }.bind(this));

}

function attachEvent(eventName, selector, eventHandler){
    if (!eventRegistry[eventName]) {
        eventRegistry[eventName] = [];
        on(document.documentElement, eventName, dispatchEvent, true);
    }

    eventRegistry[eventName].push({
        selector: selector,
        handler: eventHandler
    });
}

module.exports = {
    attachEvent: attachEvent,
    on: on,
    off: off
};