/*
Javascript running pixi.min.js to display an interactive side-scrolling list of items that freely floats around.
*/
//Constants
let item_width = 256;
let item_height = 144;
let border_colour = 0xFFFFFF;

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
let item = new PIXI.Graphics();
item.lineStyle(1, border_colour, 1);
item.drawRect(100, 100, item_width, item_height);
item.endFill();
app.stage.addChild(item);

console.log("test");