var event = require('../../src/js/event');

describe('Event module can ', function () {
    document.body.innerHTML = __html__['_site/index.html'];
    var h1 = document.getElementsByTagName('h1')[0];

        it('knows when the document has loaded', function (done) {
            var counter = 0;
            event.ready(function(){
                counter++;
                expect(counter).toBe(1);
                done();
            });
        });

        it('can emit and catch custom events on a single element e.g. document or h1', function (done) {
            var counter = 0;
            event.on(document,'petesTestOn',function(){
                counter++;
                expect(counter).toBe(1);
            });
            event.on(h1,'petesTestOn',function(){
                counter++;
                expect(counter).toBe(2);
            });
            event.on(window,'petesTestOn',function(){
                counter++;
                expect(counter).toBe(3);
                done();
            });

            event.trigger(document,'petesTestOn');
            event.trigger(h1,'petesTestOn');
            event.trigger(window,'petesTestOn');
            event.trigger(window,'unknown-not-caught-above');
        });

    it('attach events on a nodeList', function () {
        var counter = 0;
        event.on(document.querySelectorAll('div'),'petesTestOnNodeList',function(){
            counter++;
            expect(counter).toBe(1);
        });
        event.trigger(document.getElementsByTagName('div')[0],'petesTestOnNodeList');
    });

        it('can turn off custom events', function (done) {
            var counter = 0;
            var exec = function(){
                counter++;
            };
            event.on(document,'petesTestOff',exec);
            event.on(h1,'petesTestOff',exec);
            event.on(window,'petesTestOff', exec);
            event.on(window,'petesTestOffFinal', function(){
                expect(counter).toBe(0);
                done();
            });
            event.off(document,'petesTestOff', exec);
            event.off(h1,'petesTestOff', exec);
            event.off(window,'petesTestOff', exec);
            event.trigger(document,'petesTestOff', exec);
            event.trigger(h1,'petesTestOff');
            event.trigger(window,'petesTestOff');
            event.trigger(window,'petesTestOffFinal');
        });

    it('remove events from a nodeList', function () {
        var counter = 0;
        var fn = {fn : function(){
            counter++;
            expect(counter).toBe(1);
        }};
        spyOn(fn, 'fn');
        event.on(document.querySelectorAll('div'),'petesTestOn',fn.fn);
        event.off(document.querySelectorAll('div'),'petesTestOn',fn.fn);
        event.trigger(document.querySelector('div'),'petesTestOn');
        expect(fn.fn).not.toHaveBeenCalled();
    });
    it('creates `live` events', function () {
        var counter = 0;
        var fn = {fn : function(){
            counter++;
            expect(counter).toBe(1);
        }};
        spyOn(fn, 'fn');
        event.live('liveTest', 'body', fn.fn);
        event.trigger(document.querySelector('body'),'liveTest');
        //expect(fn.fn).toHaveBeenCalled();
    });

        it('will not catch events emitted from the wrong element', function (done) {
            var counter = 0;
            event.on(document,'petesTest2',function(){
                counter++;
                expect(counter).toBe(1);
                done();
            });
            event.emit(document,'petesTest2');
            event.emit(h1,'petesTest2');
            event.emit(document.documentElement,'petesTest2');
        });

        it('knows when the window has finished resizing', function (done) {
            var counter = 0;
            event.on(window,'resize', function(){
                counter++;
                expect(counter).toBe(1);
            });
            event.on(window,'resizeend', function(){
                counter++;
                expect(counter).toBe(2);
                done();
            });
            event.emit(window,'resize');
        });

        it('knows when the \'on\' and trigger demo was clicked', function () {
            var elOn = document.getElementById('css-demo-event-on');
            window.updateEventOn = function(){
                elOn.innerHTML = 'clicked';
            };
            skyComponents.event.on(elOn,'click',window.updateEventOn);


            document.querySelector('#css-demo-event-on').innerText = 're-set me';
            event.trigger(document.querySelector('#css-demo-event-on'),'click');
            expect(document.querySelector('#css-demo-event-on').innerText).toBe('clicked');
        });

});