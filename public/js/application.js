var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();

document.addEventListener("headtrackingEvent", function(e) {
	mouseX = e.x*20;
	mouseY = -e.y*20;
	// console.log(mouseX, mouseY)
}, false)();
