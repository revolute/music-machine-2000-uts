window.onload = init;

//Setup document-scoped variables
var keyMappings;
var context;
var outputNode;
var source;
var backingSource;
var activeTrack;
var manager;
var activeSoundboard;
var jsProcessor;
var gainNode;
var samplesLoaded = 0;

//Declare soundboards
var BOARD_DRUMS = 0;
var BOARD_GUITAR = 1;
var BOARD_PIANO = 2;
var BOARD_TRANCE = 3;
var BOARD_8BIT = 4;

//Declare BACKING TRACKS
var BACKING_UNICORN = 0;
var BACKING_RETROTIMER = 1;
var BACKING_GATE = 2;
var BACKING_BLUES = 3;
var BACKING_BEDLAM = 4;

// Declare default volume for backing track
var DEFAULT_BACKING_VOL = 50;

function init() {
	//Check that the browser is supported
	try {
		context = new webkitAudioContext();
	} catch(error) {
		alert("Oh no! Your browser doesn't support Web Audio. Try using the latest version Google Chrome :)");
		return;
	}

	//Set up the WebAudio objects
    source = context.createBufferSource();
	manager = new SoundboardManager();
	activeSoundboard = BOARD_DRUMS;
	//activeSoundboard = new Soundboard();

	trackManager = new BackingTrackManager();
	trackManager.loadTrack("./sounds/backing_tracks/Beat04_130BPM(Drums).wav", 0);
	trackManager.loadTrack("./sounds/backing_tracks/28(140_BPM).wav", 1);
	trackManager.loadTrack("./sounds/backing_tracks/35(135_BPM).wav", 2);
	trackManager.loadTrack("./sounds/backing_tracks/BeatK04 97-03.wav", 3);
	trackManager.loadTrack("./sounds/backing_tracks/CM139_8Bit_Beat02(120BPM).wav", 4);
	trackManager.loadTrack("./sounds/backing_tracks/Loop02.wav", 5);
	activeTrack = BACKING_UNICORN;

	//backingSource = context.createBufferSource();
	//backingSource.loop = true;

	//Load the samples up
    loadSounds();
	
	//Set up the intermediary processing node for the visualiser
	jsProcessor = context.createJavaScriptNode(2048);
    jsProcessor.onaudioprocess = audioAvailable;
	source.connect(jsProcessor);

	//Set up the backing track
	backingGainNode = context.createGainNode();
	//backingSource.connect(backingGainNode);
	backingGainNode.connect(jsProcessor);
	// Set the default volume to whatever the default has been set in the HTML
	changeBackingVolume(document.getElementById('volume-slider'));
	
	//Connect everything up
    jsProcessor.connect(context.destination);
	visualizer();
	keyMappings = new KeyMappings();
	ready();
}

//Makes sure the first soundboard is loaded before setting all the names to avoid null pointers.
function ready() {
    if(samplesLoaded < 30) {//we want it to match
        setTimeout(ready, 50);//wait 50 millisecnds then recheck
        return;
    }
    setActiveBoard(BOARD_DRUMS);
}

function setActiveBoard(soundboardID) {
	activeSoundboard = soundboardID;
	for (var i = 1; i <= 16; i++) {
		document.getElementById('pad-' + i).innerHTML = manager.getSound(soundboardID, i - 1).getName();
	};
}

function BackingTrackManager () {
	var backingTracks = new Array();

	function BackingTrack(trackID, track) {
		this.trackID = trackID; //0-4
		this.track = track; //the actual sound object

		this.getTrack = function() {
		     return track;
		}

		this.getID = function() {
		     return trackID;
		}
	}

	this.addTrack = function(trackID, track) {
		backingTracks[trackID] = new BackingTrack(trackID, track);
	}

	this.loadTrack = function(url, trackID) {
		var trackToAdd;
	    var request = new XMLHttpRequest();
	    request.open("GET", url, true);
	    request.responseType = "arraybuffer";

	    request.onload = function() {
	      trackToAdd = context.createBuffer(request.response, false);
		  trackManager.addTrack(trackID, trackToAdd);
	    }
	    request.send();
	}

	this.playTrack = function(track) {
		backingSource = context.createBufferSource(); // creates a sound source
		try {
			backingSource.buffer = track;                  // tell the source which sound to play
			backingSource.loop = true;
			backingSource.connect(backingGainNode);
			backingGainNode.connect(jsProcessor);
			backingSource.noteOn(0);                          // play the source now
		} catch(error) {
			console.log('The linked sound was not found! ' + error.message);
		}
	}

	this.getTracks = function() {
		return backingTracks;
	}

	this.setActiveTrack = function(activeTrackID) {
		activeTrack = activeTrackID;
	}


	this.toggleBackingTrack = function() {
		//supercedes playBackingTrack, fixes the multiple playback issue
		if (backingSource != null) {
			if (backingSource.playbackState == 2) {
				//Pause it, it is currently playing
				backingSource.noteOff(0);
				// Change button class to play
				document.getElementById("play-stop").classList.remove("stop");
				document.getElementById("play-stop").classList.add("play");
			} else {
				this.playTrack(backingTracks[activeTrack].getTrack());
				//loadBackingTrack("./sounds/backing_tracks/Beat04_130BPM(Drums).wav");
				// Change button class to stop
				document.getElementById("play-stop").classList.remove("play");
				document.getElementById("play-stop").classList.add("stop");
			}
		} else {
			this.playTrack(backingTracks[activeTrack].getTrack());
			// Change button class to stop
			document.getElementById("play-stop").classList.remove("play");
			document.getElementById("play-stop").classList.add("stop");
		}
	}
}

function SoundboardManager() {
	var soundboards = new Array();

	//Populate the array with the soundboards
	soundboards[BOARD_DRUMS] = new Soundboard(BOARD_DRUMS);
	soundboards[BOARD_GUITAR] = new Soundboard(BOARD_GUITAR);
	soundboards[BOARD_PIANO] = new Soundboard(BOARD_PIANO);
	soundboards[BOARD_TRANCE] = new Soundboard(BOARD_TRANCE);
	soundboards[BOARD_8BIT] = new Soundboard(BOARD_8BIT);

	this.addSound = function (name, soundID, soundboardID, soundToAdd) {
		soundboards[soundboardID].addSound(name, soundID, soundboardID, soundToAdd);
	}

	this.getSound = function(soundboardID, soundID) {
		return soundboards[soundboardID].getSound(soundID);
	}

	this.loadSample = function(url, name, soundID, soundboardID) {
		var soundToAdd;
	    var request = new XMLHttpRequest();
	    request.open("GET", url, true);
	    request.responseType = "arraybuffer";

	    request.onload = function() {
	      samplesLoaded++;
	      soundToAdd = context.createBuffer(request.response, false);
		  manager.addSound(name, soundID, soundboardID, soundToAdd);
	    }
	    request.send();
	}

	this.play = function(soundID) {
		this.playSample(soundboards[activeSoundboard].getSound(soundID).getSound());
	}

	this.playSample = function(sound) {
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

	function Soundboard(soundboardID) {
		this.soundboardID = soundboardID;

		var sounds = new Array();

		this.getSound = function (id) {
			return sounds[id];
		}

		this.getSoundboardID = function (id) {
			return soundboardID;
		}
		
		this.addSound = function (name, soundID, soundboardID, sound) {
			if (typeof sounds == 'undefined')
			{
				console.log('Error: This code should not be triggered.');
			}
			sounds[soundID] = (new Sound(name, soundID, soundboardID, sound)); //add the new sound to the soundboard
		}
	}

	function Sound(name, soundID, soundboardID, sound) {
		this.name = name;
		this.soundID = soundID; //0-15
		this.soundboardID = soundboardID; //0-4
		this.sound = sound; //the actual sound object

		this.getSound = function() {
		     return sound;
		}

		this.getName = function() {
		     return name;
		}

		this.getID = function() {
		     return soundID;
		}

		this.getSoundboardID = function() {
			return soundboardID;
		}
	}
}

//MOVE THIS TO BACKINGTRACK
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

	// Backing track bindings
	Mousetrap.bind('space', function(e) {
		simulate(document.getElementById("backing-toggle"), "click");
	});
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