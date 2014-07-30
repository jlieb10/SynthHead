var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
var htracker = new headtrackr.Tracker({ui: false});
htracker.init(videoInput, canvasInput);
htracker.start();

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// connect oscillator to gain node to speakers
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// find window size; set constants
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// create initial theremin frequency and volumn values
var maxFreq = 6000;
var maxVol = 1;

var initialFreq = 3000;
var initialVol = 0;

// set options for the oscillator

oscillator.type = 1; // square wave
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.start();

gainNode.gain.value = initialVol;

// Estimated head coordinates
var HeadX;
var HeadY;

// Change vals as head moves
document.addEventListener("headtrackingEvent", function(e) {
    KeyFlag = false;
    HeadX = e.x*20;
    HeadY = -e.y*20;
    oscillator.frequency.value = (HeadX/WIDTH) * maxFreq;
    gainNode.gain.value = (HeadY/HEIGHT) * maxVol;
}, false);

// Mute button
var mute = document.querySelector('.mute');

mute.onclick = function() {
  if(mute.getAttribute('data-muted') === 'false') {
    gainNode.disconnect(audioCtx.destination);
    mute.setAttribute('data-muted', 'true');
    mute.innerHTML = "Unmute";
  } else {
    gainNode.connect(audioCtx.destination);
    mute.setAttribute('data-muted', 'false');
    mute.innerHTML = "Mute";
  };
}
