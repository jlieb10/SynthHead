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
var maxFreq = 3000;
var maxVol = 1;

var initialFreq = 300;
var initialVol = 0;

// set options for the oscillator

oscillator.type = 1; // square wave
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.start();

gainNode.gain.value = initialVol;

// Estimated head coordinates
var HeadX;
var HeadY;
var CurX;
var CurY;

// Change vals as head moves
document.addEventListener("headtrackingEvent", function(e) {
    KeyFlag = false;
    HeadX = Math.abs(e.x + 40)*10;
    HeadY = Math.abs(e.y + 10)*2;
    oscillator.frequency.value = (HeadX/WIDTH) * maxFreq;
    gainNode.gain.value = (HeadY/HEIGHT) * maxVol;
    // console.log(HeadX, HeadY)
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

document.onmousemove = updatePage;

// function updatePage(e) {
//     KeyFlag = false;

//     CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
//     CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

//     oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
//     gainNode.gain.value = (CurY/HEIGHT) * maxVol;

//     console.log(CurX, CurY);
// }
