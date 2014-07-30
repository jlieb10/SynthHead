var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();


// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// connect oscillator to gain node to speakers

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 1;

var initialFreq = 3000;
var initialVol = 0.5;

// set options for the oscillator

oscillator.type = 1; // square wave
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.start();

gainNode.gain.value = initialVol;

// Mouse pointer coordinates

var CurX;
var CurY;

document.addEventListener("headtrackingEvent", function(e) {
    KeyFlag = false;
    CurX = e.x*20;
    CurY = -e.y*20;
    oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
    gainNode.gain.value = (CurY/HEIGHT) * maxVol;

    // console.log(mouseX, mouseY)
}, false);


// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

// document.onmousemove = updatePage;

// function updatePage(e) {
//     KeyFlag = false;

//     CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
//     CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

//     oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
//     gainNode.gain.value = (CurY/HEIGHT) * maxVol;

//     //canvasDraw();
// }

// mute button

// var mute = document.querySelector('.mute');

// mute.onclick = function() {
//   if(mute.getAttribute('data-muted') === 'false') {
//     gainNode.disconnect(audioCtx.destination);
//     mute.setAttribute('data-muted', 'true');
//     mute.innerHTML = "Unmute";
//   } else {
//     gainNode.connect(audioCtx.destination);
//     mute.setAttribute('data-muted', 'false');
//     mute.innerHTML = "Mute";
//   };
// }
