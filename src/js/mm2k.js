window.onload = init;

var keyMappings;
var context;
var outputNode;
var source;
var backingSsource;
var manager;
var activeSoundboard;
var jsProcessor;
var gainNode;

function init() {
    context = new webkitAudioContext();
    source = context.createBufferSource();
	activeSoundboard = new Soundboard();
	manager = new SoundboardManager();
	backingSource = context.createBufferSource();
	backingSource.loop = true;
	backingGainNode = context.createGainNode();
	
    loadSample("./sounds/samples/drums/CYCdh_ElecK04-Clap.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-ClHat01.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-ClHat02.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Cymbal01.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Cymbal02.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-HfHat.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Kick01.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Kick02.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Kick03.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Snr01.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Snr02.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Snr03.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom01.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom02.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom03.wav", "vibe");
	loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom04.wav", "vibe");
	
	manager.setActiveBoard("vibe");
	
	jsProcessor = context.createJavaScriptNode(2048);
    jsProcessor.onaudioprocess = audioAvailable;
	source.connect(jsProcessor);
	backingSource.connect(backingGainNode);
	backingGainNode.connect(jsProcessor);
    jsProcessor.connect(context.destination);

	visualizer();
	keyMappings = new KeyMappings();
}

function playBackingTrack() {
    loadBackingTrack("./sounds/backing_tracks/Beat04_130BPM(Drums).wav");
}

function stopBackingTrack() {
	backingSource.noteOff(0);
}

function loadBackingTrack(url) {
    // Load asynchronously

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
		backingSource = context.createBufferSource();
		backingSource.connect(backingGainNode);
		backingGainNode.connect(jsProcessor);
        backingSource.buffer = context.createBuffer(request.response, false);
        backingSource.looping = true;
        backingSource.noteOn(0);
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

function changeBackingVolume(volumeSlider) {
	var volume = volumeSlider.value;
	var fraction = parseInt(volume) / parseInt(volumeSlider.max);
	backingGainNode.gain.value = fraction * fraction;
}

function KeyMappings() {
	// Sound pad bindings
	Mousetrap.bind('q', function(e) {
		simulate(document.getElementById("pad-1"), "click");
		document.getElementById("pad-1").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('q', function(e) {
		document.getElementById("pad-1").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('w', function(e) {
		simulate(document.getElementById("pad-2"), "click");
		document.getElementById("pad-2").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('w', function(e) {
		document.getElementById("pad-2").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('e', function(e) {
		simulate(document.getElementById("pad-3"), "click");
		document.getElementById("pad-3").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('e', function(e) {
		document.getElementById("pad-3").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('r', function(e) {
		simulate(document.getElementById("pad-4"), "click");
		document.getElementById("pad-4").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('r', function(e) {
		document.getElementById("pad-4").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('t', function(e) {
		simulate(document.getElementById("pad-5"), "click");
		document.getElementById("pad-5").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('t', function(e) {
		document.getElementById("pad-5").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('y', function(e) {
		simulate(document.getElementById("pad-6"), "click");
		document.getElementById("pad-6").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('y', function(e) {
		document.getElementById("pad-6").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('u', function(e) {
		simulate(document.getElementById("pad-7"), "click");
		document.getElementById("pad-7").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('u', function(e) {
		document.getElementById("pad-7").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('i', function(e) {
		simulate(document.getElementById("pad-8"), "click");
		document.getElementById("pad-8").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('i', function(e) {
		document.getElementById("pad-8").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('a', function(e) {
		simulate(document.getElementById("pad-9"), "click");
		document.getElementById("pad-9").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('a', function(e) {
		document.getElementById("pad-9").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('s', function(e) {
		simulate(document.getElementById("pad-10"), "click");
		document.getElementById("pad-10").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('s', function(e) {
		document.getElementById("pad-10").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('d', function(e) {
		simulate(document.getElementById("pad-11"), "click");
		document.getElementById("pad-11").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('d', function(e) {
		document.getElementById("pad-11").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('f', function(e) {
		simulate(document.getElementById("pad-12"), "click");
		document.getElementById("pad-12").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('f', function(e) {
		document.getElementById("pad-12").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('g', function(e) {
		simulate(document.getElementById("pad-13"), "click");
		document.getElementById("pad-13").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('g', function(e) {
		document.getElementById("pad-13").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('h', function(e) {
		simulate(document.getElementById("pad-14"), "click");
		document.getElementById("pad-14").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('h', function(e) {
		document.getElementById("pad-14").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('j', function(e) {
		simulate(document.getElementById("pad-15"), "click");
		document.getElementById("pad-15").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('j', function(e) {
		document.getElementById("pad-15").classList.remove("active");
	}, 'keyup');
	Mousetrap.bind('k', function(e) {
		simulate(document.getElementById("pad-16"), "click");
		document.getElementById("pad-16").classList.add("active");
	}, 'keydown');
	Mousetrap.bind('k', function(e) {
		document.getElementById("pad-16").classList.remove("active");
	}, 'keyup');
	
	// Selector button bindings
	Mousetrap.bind('1', function(e) {
		simulate(document.getElementById("backing-tracks-1"), "click");
	}, 'keypress');
	Mousetrap.bind('2', function(e) {
		simulate(document.getElementById("backing-tracks-2"), "click");
	}, 'keypress');
	Mousetrap.bind('3', function(e) {
		simulate(document.getElementById("backing-tracks-3"), "click");
	}, 'keypress');
	Mousetrap.bind('4', function(e) {
		simulate(document.getElementById("backing-tracks-4"), "click");
	}, 'keypress');
	Mousetrap.bind('5', function(e) {
		simulate(document.getElementById("backing-tracks-5"), "click");
	}, 'keypress');
	Mousetrap.bind('6', function(e) {
		simulate(document.getElementById("instruments-1"), "click");
	}, 'keypress');
	Mousetrap.bind('7', function(e) {
		simulate(document.getElementById("instruments-2"), "click");
	}, 'keypress');
	Mousetrap.bind('8', function(e) {
		simulate(document.getElementById("instruments-3"), "click");
	}, 'keypress');
	Mousetrap.bind('9', function(e) {
		simulate(document.getElementById("instruments-4"), "click");
	}, 'keypress');
	Mousetrap.bind('0', function(e) {
		simulate(document.getElementById("instruments-5"), "click");
	}, 'keypress');
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