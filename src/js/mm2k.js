window.onload = init;

var keyMappings;
var context;
var outputNode;
var source;
var manager;
var activeSoundboard;
var jsProcessor;

function init() {
	keyMappings = new KeyMappings();
    context = new webkitAudioContext();
    source = context.createBufferSource();
	activeSoundboard = new Soundboard();
	manager = new SoundboardManager();	
	
    loadSample("./sounds/test/samples/syntklocka_stab_1.ogg", "vibe");
	loadSample("./sounds/test/samples/syntklocka_stab_2.ogg", "vibe");
	loadSample("./sounds/test/samples/syntklocka_stab_3.ogg", "vibe");
	loadSample("./sounds/test/samples/syntklocka_stab_4.ogg", "vibe");
	loadSample("./sounds/test/samples/syntklocka_stab_5.ogg", "vibe");
	manager.setActiveBoard("vibe");
	
	jsProcessor = context.createJavaScriptNode(2048);
    jsProcessor.onaudioprocess = audioAvailable;
	initBackingAudio();
}

function initBackingAudio() {

    // This AudioNode will do the amplitude modulation effect directly in JavaScript
			// run jsfft audio frame event
    
    // Connect the processing graph: source -> jsProcessor -> analyser -> destination
    source.connect(jsProcessor);
    jsProcessor.connect(context.destination);

    // Load the sample buffer for the audio source
    loadBackingSample("./js/vis/song2.ogg");
}

function loadBackingSample(url) {
    // Load asynchronously

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() { 
        source.buffer = context.createBuffer(request.response, false);
        source.looping = true;
        source.noteOn(0);
		visualizer();				// run jsfft visualizer
    }

    request.send();
}

function SoundboardManager() {
	var soundboards = {
		vibe: new Soundboard(), 
		test: new Soundboard()
	}
	
	this.addSound = function (soundToAdd, soundboardID) {
		for (var key in soundboards) {
			if (key == soundboardID) {
				soundboards[key].addSound(soundToAdd);
			}
		}
	}
	
	this.setActiveBoard = function(soundboardID) {
		for (var key in soundboards) {
			if (key == soundboardID) {
				activeSoundboard = soundboards[key];
			}
		}
	}

}

function Soundboard() {
	var sounds = new Array();
	this.getSound = function (id) {
		return sounds[id];
	}
	
	this.addSound = function (param) {
		if (typeof sounds == 'undefined')
		{
			console.log('Error: This code should not be triggered.');
		}
		sounds.push(param);
	}
}

function loadSample(url, soundboardID) {
	var sound;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      sound = context.createBuffer(request.response, false);
	  manager.addSound(sound, soundboardID);
    }
    request.send();
}

function playSample(sound) {
	var source = context.createBufferSource(); // creates a sound source
	try {
		source.buffer = sound;                  // tell the source which sound to play
		source.connect(jsProcessor);
		//source.connect(context.destination);       // connect the source to the context's destination (the speakers)
		source.noteOn(0);                          // play the source now
	} catch(error) {
		console.log('The linked sound was not found! ' + error.message);
	}
}

function KeyMappings() {
	Mousetrap.bind('q', function(e) {
		simulate(document.getElementById("pad-1"), "click");
		document.getElementById("pad-1").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('q', function(e) {
		document.getElementById("pad-1").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('w', function(e) {
		simulate(document.getElementById("pad-2"), "click");
		document.getElementById("pad-2").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('w', function(e) {
		document.getElementById("pad-2").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('e', function(e) {
		simulate(document.getElementById("pad-3"), "click");
		document.getElementById("pad-3").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('e', function(e) {
		document.getElementById("pad-3").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('r', function(e) {
		simulate(document.getElementById("pad-4"), "click");
		document.getElementById("pad-4").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('r', function(e) {
		document.getElementById("pad-4").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('t', function(e) {
		simulate(document.getElementById("pad-5"), "click");
		document.getElementById("pad-5").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('t', function(e) {
		document.getElementById("pad-5").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('y', function(e) {
		simulate(document.getElementById("pad-6"), "click");
		document.getElementById("pad-6").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('y', function(e) {
		document.getElementById("pad-6").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('u', function(e) {
		simulate(document.getElementById("pad-7"), "click");
		document.getElementById("pad-7").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('u', function(e) {
		document.getElementById("pad-7").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('i', function(e) {
		simulate(document.getElementById("pad-8"), "click");
		document.getElementById("pad-8").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('i', function(e) {
		document.getElementById("pad-8").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('a', function(e) {
		simulate(document.getElementById("pad-9"), "click");
		document.getElementById("pad-9").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('a', function(e) {
		document.getElementById("pad-9").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('s', function(e) {
		simulate(document.getElementById("pad-10"), "click");
		document.getElementById("pad-10").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('s', function(e) {
		document.getElementById("pad-10").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('d', function(e) {
		simulate(document.getElementById("pad-11"), "click");
		document.getElementById("pad-11").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('d', function(e) {
		document.getElementById("pad-11").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('f', function(e) {
		simulate(document.getElementById("pad-12"), "click");
		document.getElementById("pad-12").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('f', function(e) {
		document.getElementById("pad-12").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('g', function(e) {
		simulate(document.getElementById("pad-13"), "click");
		document.getElementById("pad-13").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('g', function(e) {
		document.getElementById("pad-13").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('h', function(e) {
		simulate(document.getElementById("pad-14"), "click");
		document.getElementById("pad-14").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('h', function(e) {
		document.getElementById("pad-14").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('j', function(e) {
		simulate(document.getElementById("pad-15"), "click");
		document.getElementById("pad-15").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('j', function(e) {
		document.getElementById("pad-15").classList.toggle("active");
	}, 'keyup');
	Mousetrap.bind('k', function(e) {
		simulate(document.getElementById("pad-16"), "click");
		document.getElementById("pad-16").classList.toggle("active");
	}, 'keydown');
	Mousetrap.bind('k', function(e) {
		document.getElementById("pad-16").classList.toggle("active");
	}, 'keyup');
}
// credit for mouse simulation code: http://stackoverflow.com/a/6158050

function simulate(element, eventName) {
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