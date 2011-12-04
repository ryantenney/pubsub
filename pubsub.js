// pubsub.js 0.0.1
// (c) 2011 Ryan W Tenney
// Freely distributable under the MIT license.
// https://github.com/ryantenney/pubsub

(function () {

    var root = this,
        slice = Array.prototype.slice,
        padding = "\uFEFF",

        pubsub = {},
        topics = {};

    /**
     * subscribe(topic, fn)
     * subscribe(topic, ctx, fn)
     * subscribe(topic, fn, pri)
     * subscribe(topic, ctx, fn, pri)
     */
    pubsub.subscribe = function (topic) {
        var argv = slice.call(arguments, 1),
            fn = argv.shift(), ctx = null, pri;

        if (typeof fn != "function") {
            ctx = fn;
            fn = argv.shift();
        }

        pri = argv.shift() || 10;

        addSubscriber(getTopic(topic).subscribers, ctx, fn, pri);
    };

    pubsub.unsubscribe = function (topic, fn) {
        removeSubscriber(getTopic(topic).subscribers, fn);
    };

    pubsub.publish = function (topic) {
        fireSubscribers(getTopic(topic).subscribers, slice.call(arguments, 1));
    };

    function getTopic(name) {
        return topics[padding + name] || createTopic(name);
    }

    function createTopic(name) {
        var topic = {
            name : name,
            subscribers : []
        };
        topics[padding + name] = topic;
        return topic;
    }

    function addSubscriber(arr, ctx, fn, pri) {
        var sub = {
            fn: fn,
            ctx: ctx,
            pri: pri
        };

        for (var i = 0, l = arr.length; l > i; ++i) {
            if (arr[i].pri >= pri) {
                arr.splice(i, 0, sub);
                return;
            }
        }

        arr.push(sub);
    }

    function removeSubscriber(arr, fn) {
        for (var i = 0, l = arr.length; l > i; ++i) {
            if (arr[i].fn === fn) {
                arr.splice(i, 1);
            }
        }
    }

    function fireSubscribers(arr, args) {
        for (var i = 0, l = arr.length; l > i; ++i) {
            var sub = arr[i];
            if (sub.fn.apply(sub.ctx, args) === false) {
                return;
            }
        }
    }


    // Expose it to the world
    // Borrowed from Underscore.js
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = pubsub;
        }
        exports.pubsub = pubsub;
    } else if (typeof define === 'function' && define.amd) {
        // Register as a named module with AMD.
        define('pubsub', function() {
            return pubsub;
        });
    } else {
        // Exported as a string, for Closure Compiler "advanced" mode.
        root['pubsub'] = pubsub;
    }

}).call(this);
