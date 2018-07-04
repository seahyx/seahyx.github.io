/*
Javascript running pixi.min.js to display an interactive side-scrolling list of items that freely floats around.
*/

//Initiation ritual
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)


//Create a Pixi Application
let app = new PIXI.Application({
	width: 1280,
	height: 500,
	backgroundColor: 0x000000,
	antialias: true,
	transparent: false,
	resolution: 1
	});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//Make the canvas fill the browser window proportionately
scaleToWindow(app.view);
//...and whenever the window is resized
window.addEventListener("resize", function(event){ 
	scaleToWindow(app.view);
});

//Get the scaling factor
var scale = scaleToWindow(app.view);


//Draw a rectangle
let graphics = new PIXI.Graphics();
graphics.lineStyle(1, 0xFFFFFF, 1);
graphics.beginFill(0x000000, 0);
graphics.drawRect(100, 100, 128, 72);
graphics.endFill();
app.stage.addChild(graphics);