window.onload = init;

var context;
var source;

function loadSample(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      source.buffer = context.createBuffer(request.response, false);
	  source.connect(context.destination);
      source.looping = true;
      source.noteOn(0);
    }

    request.send();
}

function init()
{
    context = new webkitAudioContext();
    source = context.createBufferSource();

    loadSample("./sounds/test/samples/syntklocka_stab_1.ogg");
}