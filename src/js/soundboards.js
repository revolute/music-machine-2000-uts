//Declare soundboards
var BOARD_DRUMS = 0;
var BOARD_GUITAR = 1;
var BOARD_PIANO = 2;
var BOARD_TRANCE = 3;
var BOARD_8BIT = 4;

function loadSounds() {

	//Load the samples up
	//function loadSample(url, name, soundID, soundboardID) {
    
	// Drum board
    manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Clap.wav", "Clap", 0, BOARD_DRUMS);
    manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-ClHat01.wav", "Hi-Hat 1", 1, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-ClHat02.wav", "Hi-Hat 2", 2, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Cymbal01.wav", "Cymbal 1", 3, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Cymbal02.wav", "Cymbal 2", 4, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-HfHat.wav", "Crash", 5, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Kick01.wav", "Bass 1", 6, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Kick02.wav", "Bass 2", 7, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Kick03.wav", "Bass 3", 8, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Snr01.wav", "Snare 1", 9, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Snr02.wav", "Snare 2", 10, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Snr03.wav", "Snare 3", 11, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom01.wav", "Tom 1", 12, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom02.wav", "Tom 2", 13, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom03.wav", "Tom 3", 14, BOARD_DRUMS);
	manager.loadSample("./sounds/samples/drums/CYCdh_ElecK04-Tom04.wav", "Tom 4", 15, BOARD_DRUMS);

	// Guitar board
	manager.loadSample("./sounds/samples/guitar/001_D1_PM_4.wav", "Low-D", 0, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/002_D#1_PM_4.wav", "Low-D#", 1, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/003_E1_PM_4.wav", "Low-E", 2, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/004_F1_PM_4", "Low-F", 3, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/005_F#1_PM_4.wav", "Low-F#", 4, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/006_G1_PM_4.wav", "Low-G", 5, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/007_G#1_PM_4.wav", "Low-G#", 6, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/008_A1_PM_4.wav", "Low-A", 7, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/009_A#1_PM_4.wav", "Low-A#", 8, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/010_B1_PM_4.wav", "Low-B", 9, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/011_C1_PM_4.wav", "Low-C", 10, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/012_C#1_PM_4.wav", "Low-C#", 11, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/013_D2_PM_4.wav", "Hi-D", 12, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/014_D#2_PM_4.wav", "Hi-D#", 13, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/015_E2_PM_4.wav", "Hi-E", 14, BOARD_GUITAR);
	manager.loadSample("./sounds/samples/guitar/016_F2_PM_4.wav", "Hi-F", 15, BOARD_GUITAR);

	// Piano board
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major C low.wav", "maj-C", 0, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major C#.wav", "maj-C#", 1, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major D.wav", "maj-D", 2, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major D#.wav", "maj-D#", 3, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major E.wav", "maj-E", 4, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major F.wav", "maj-F", 5, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major F#.wav", "maj-F#", 6, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major G.wav", "maj-G", 7, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major G#.wav", "maj-G#", 8, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major A.wav", "maj-A", 9, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major A#.wav", "maj-A#", 10, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - major B.wav", "maj-B", 11, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - minor chords - Cm higher.wav", "min-Cm", 12, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - minor chords - Dm higher.wav", "min-Dm", 13, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - minor chords - Am higher.wav", "min-Am", 14, BOARD_PIANO);
	manager.loadSample("./sounds/samples/piano/Grand Piano - Fazioli - minor chords - Bm higher.wav", "min-Bm", 15, BOARD_PIANO);

	// Trance board
	manager.loadSample("./sounds/samples/trance/FX_02.wav", "Pulse", 0, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_07.wav", "Pulse Fade", 1, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_08.wav", "Lazer", 2, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_11.wav", "Launch", 3, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_14.wav", "ET", 4, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_21.wav", "Chirp", 5, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_26.wav", "Wail", 6, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_31.wav", "Alert", 7, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_32.wav", "Rattle 1", 8, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_33.wav", "Rattle 2", 9, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_36.wav", "UFO", 10, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_58.wav", "Echo", 11, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_61.wav", "Hum", 12, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_62.wav", "Cicada", 13, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_63.wav", "Hover 1", 14, BOARD_TRANCE);
	manager.loadSample("./sounds/samples/trance/TFX_64.wav", "Hover 2", 15, BOARD_TRANCE);

	// 8-bit board
	manager.loadSample("./sounds/samples/8bit/CM139_FX09.wav", "Explode", 0, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX11.wav", "Success", 1, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX13.wav", "Scuttle", 2, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX14.wav", "Dazzle", 3, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX15.wav", "Pacman Die", 4, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX18.wav", "Pacman Eat", 5, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX20.wav", "Coin", 6, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX21.wav", "Clink", 7, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX23.wav", "Trip Over", 8, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX26.wav", "Block", 9, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX36.wav", "Warp", 10, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX43.wav", "Pickup", 11, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX47.wav", "Shot Down", 12, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX53.wav", "Blaster", 13, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX56.wav", "Level-Up", 14, BOARD_8BIT);
	manager.loadSample("./sounds/samples/8bit/CM139_FX62.wav", "Hi-Score", 15, BOARD_8BIT);
}