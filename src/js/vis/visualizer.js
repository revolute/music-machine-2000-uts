/*
Copyright 2010, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var context;
var source = 0;
var jsProcessor = 0;

var theme = ["rgba(255, 255, 255,","rgba(240, 240, 240,","rgba(210, 210, 210,","rgba(180, 180, 180,","rgba(150, 150, 150,","rgba(120, 120, 150,","rgba(90, 90, 150,","rgba(60, 60, 180,","rgba(30, 30, 180,","rgba(0, 0, 200,","rgba(0, 0, 210,","rgba(0, 0, 220,","rgba(0, 0, 230,","rgba(0, 0, 240,","rgba(0, 0, 255,","rgba(0, 30, 255,","rgba(0, 60, 255,","rgba(0, 90, 255,","rgba(0, 120, 255,","rgba(0, 150, 255,"];

var histoindex = 0;
var histomax = 500;

histobuffer_x = new Array();
histobuffer_y = new Array();
histobuffer_t = new Array();
for (a=0;a<histomax;a++) {
	histobuffer_t[a] = 0;
}

maxvalue = new Array();
for (a=0;a<310;a++) {
	maxvalue[a] = 0;
}

currentvalue = new Array();

var frameBufferSize = 4096;
var bufferSize = frameBufferSize/4;

var signal = new Float32Array(bufferSize);
var peak = new Float32Array(bufferSize);

var fft = new FFT(bufferSize, 44100);


var canvas = document.getElementById('fft');
var ctx = canvas.getContext('2d');


function audioAvailable(event) {

	// Copy input arrays to output arrays to play sound
	var inputArrayL = event.inputBuffer.getChannelData(0);
	var inputArrayR = event.inputBuffer.getChannelData(1);
	var outputArrayL = event.outputBuffer.getChannelData(0);
	var outputArrayR = event.outputBuffer.getChannelData(1);
	
	var n = inputArrayL.length;
	for (var i = 0; i < n; ++i) {
		outputArrayL[i] = inputArrayL[i];
		outputArrayR[i] = inputArrayR[i];
		signal[i] = (inputArrayL[i] + inputArrayR[i]) / 2;		// create data frame for fft - deinterleave and mix down to mono
	}
	
	// perform forward transform
	fft.forward(signal);
	
	for ( var i = 0; i < bufferSize/8; i++ ) {
		magnitude = fft.spectrum[i] * 4000; 					// multiply spectrum by a zoom value
		
		currentvalue[i] = magnitude;
		
		if (magnitude > maxvalue[i]) {
			maxvalue[i] = magnitude;
			new_pos(canvas.width/2 + i*4 + 4,(canvas.height/2)-magnitude-20);
			new_pos(canvas.width/2 + i*4 + 4,(canvas.height/2)+magnitude+20);
			new_pos(canvas.width/2 - i*4 + 4,(canvas.height/2)-magnitude-20);
			new_pos(canvas.width/2 - i*4 + 4,(canvas.height/2)+magnitude+20);
		} else {
			if (maxvalue[i] > 10) {
				maxvalue[i]--;
			}
		}
	
	}
	
}


function new_pos(x,y) {
	x = Math.floor(x);
	y = Math.floor(y);
	
	histobuffer_t[histoindex] = 19;
	histobuffer_x[histoindex] = x;
	histobuffer_y[histoindex++] = y;
	
	if (histoindex > histomax) {
		histoindex = 0;
	}
}

var spectrum_on = false;

function visualizer() {

	ctx.clearRect(0,0, canvas.width, canvas.height);

	if (spectrum_on) {
		ctx.fillStyle = '#000044';
		for (var i=0; i<currentvalue.length; i++) {
			// Draw rectangle bars for each frequency bin
			ctx.fillRect(i * 8, canvas.height, 7, -currentvalue[i]*3);
		}
	}

	for (h=0;h<histomax;h++) {
		if (histobuffer_t[h] > 0) {
			var size = histobuffer_t[h] * 4;
			ctx.fillStyle = theme[ (histobuffer_t[h])] + (0.5 - (0.5 - histobuffer_t[h]/40))+')';
			ctx.beginPath();
			ctx.arc(histobuffer_x[h], histobuffer_y[h], size * .5, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();

			histobuffer_t[h] = histobuffer_t[h] - 1;
			histobuffer_y[h] = histobuffer_y[h] - 3 + Math.random() * 6;
			histobuffer_x[h] = histobuffer_x[h] - 3 + Math.random() * 6;
		}
	}
	t = setTimeout('visualizer()',50);
}


function toggle_spectrum() {
	if (spectrum_on) {
		spectrum_on = false;
	} else {
		spectrum_on = true;		
	}
}