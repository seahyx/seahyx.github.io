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
var app = new PIXI.Application({
	width: 1280,
	height: 500,
	backgroundColor: 0x000000,
	antialias: true,
	transparent: true,
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

//Define deltaTime ticker
app.ticker.add(update);

//Initiates the update loop
requestAnimationFrame(update);




/* Constants */


//Item definitions
var item_width = 256;
var item_height = 144;
var border_colour = 0xFFFFFF;

//Factor for parallax effect for items when moving mouse
var mouse_parallax_factor_x = 0.1;
var mouse_parallax_factor_y = 0.1;




/* Actual stuff working */


//List of menu items
var items = [];

//Create a menu graphic
function defineMenuGraphic(x, y) {

	var obj = new PIXI.Graphics();

	obj.beginFill();
	//Define stroke width and colour
	obj.lineStyle(1, border_colour, 1);
	//Draw rectangle menu border
	obj.drawRect(x, y, item_width, item_height);
	obj.endFill();

	//Define anchor point to be center
	obj.pivot.set(item_width/2, item_height/2);

	app.stage.addChild(obj);

	return obj;
}

//Create an item object. Direction is angle in radians. 0 is towards the right, anti-clockwise
var item = {
	def_x: 640 / 2,	//x pos without offset
	def_y: 250 / 2,	//y pos without offset
	speed: 0,
	direction: 3 * Math.PI / 2};
item.graphic = defineMenuGraphic(item.def_x, item.def_y);
items.push(item);


//Item parallax effect when moving mouse

function parallaxOffset(factor_x, factor_y) {

	//Get mouse position
	let mouse_pos = app.renderer.plugins.interaction.mouse.global;

	//Calculate x offset
	let x_result = -(mouse_pos.x - (app.renderer.width / 2)) * factor_x;

	//Calculate y offset
	let y_result = -(mouse_pos.y - (app.renderer.height / 2)) * factor_y;

	return {x: x_result, y: y_result};
}




/* Update loop */


function update(deltaTime) {

	//dt change to per second
	let dt = deltaTime / 60;

	//Update positions
	items.forEach(function(e) {
		//Velocity
		// e.def_x += Math.cos(e.direction) * e.speed * dt;
		// e.def_y += Math.sin(e.direction) * e.speed * dt;

		//Offset
		let offset = parallaxOffset(mouse_parallax_factor_x, mouse_parallax_factor_x);

		//Update visual
		e.graphic.x = e.def_x + offset.x;
		e.graphic.y = e.def_y + offset.y;
	});

	//Debugging purposes
	//console.log(dt);
}