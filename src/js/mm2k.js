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

function KeyMappings() {
	Mousetrap.bind('a', function(e) {
		playSample(soundboard.getSound(0));
	});
	Mousetrap.bind('s', function(e) {
		playSample(soundboard.getSound(1));
	});
	Mousetrap.bind('d', function(e) {
		playSample(soundboard.getSound(2));
	});
}