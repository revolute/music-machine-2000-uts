window.onload = init;

var context;
var source;
var soundboard = new Soundboard();
var keyMappings = new KeyMappings();

function Soundboard() {
	var sounds = new Array();
	this.getSound = function (id) {
		return sounds[id];
	}
	
	this.addSound = function (param) {
		if (typeof sounds == 'undefined')
		{
			Console.log("its unbelievable");
		}
		sounds.push(param);
	}
}

function KeyMappings() {
	Mousetrap.bind('a', function(e) {
		simulate(document.getElementById("cool"), "click");
		document.getElementById("cool").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('a', function(e) {
		document.getElementById("cool").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('s', function(e) {
		playSample(soundboard.getSound(1));
	});
	Mousetrap.bind('d', function(e) {
		playSample(soundboard.getSound(2));
	});
}

function loadSample(url) {
	var sound;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      sound = context.createBuffer(request.response, false);
	  soundboard.addSound(sound);
    }
    request.send();
}

function playSample(sound) {
	var source = context.createBufferSource(); // creates a sound source
	source.buffer = sound;                    // tell the source which sound to play
	source.connect(context.destination);       // connect the source to the context's destination (the speakers)
	source.noteOn(0);                          // play the source now
}

function init() {
    context = new webkitAudioContext();
    source = context.createBufferSource();
    loadSample("./sounds/test/samples/syntklocka_stab_1.ogg");
	loadSample("./sounds/test/samples/syntklocka_stab_2.ogg");
	loadSample("./sounds/test/samples/syntklocka_stab_3.ogg");
	loadSample("./sounds/test/samples/syntklocka_stab_4.ogg");
	loadSample("./sounds/test/samples/syntklocka_stab_5.ogg");
}

 function simulate(element, eventName)
    {
        var options = extend(defaultOptions, arguments[2] || {});
        var oEvent, eventType = null;

        for (var name in eventMatchers)
        {
            if (eventMatchers[name].test(eventName)) { eventType = name; break; }
        }

        if (!eventType)
            throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

        if (document.createEvent)
        {
            oEvent = document.createEvent(eventType);
            if (eventType == 'HTMLEvents')
            {
                oEvent.initEvent(eventName, options.bubbles, options.cancelable);
            }
            else
            {
                oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
          options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
          options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
            }
            element.dispatchEvent(oEvent);
        }
        else
        {
            options.clientX = options.pointerX;
            options.clientY = options.pointerY;
            var evt = document.createEventObject();
            oEvent = extend(evt, options);
            element.fireEvent('on' + eventName, oEvent);
        }
        return element;
    }

function extend(destination, source) {
	for (var property in source)
	  destination[property] = source[property];
	return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}