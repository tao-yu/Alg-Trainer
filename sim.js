var canvas = document.getElementById("cube");
var ctx = canvas.getContext("2d");
var stickerSize = 100;

var cube = new Cube();

function fillSticker(x, y, colour){
	ctx.fillStyle = colour;
	ctx.fillRect(stickerSize * x,stickerSize * y,stickerSize,stickerSize);
}

function fillWithIndex(x, y, face, index, cubestring){
	index--;
	switch(face){
		case "u":
			break;
		case "r":
			index+=9;
			break;
		case "f":
			index+=18;
			break;
		case "d":
			index+=27;
			break;
		case "l":
			index+=36;
			break;
		case "b":
			index+=45;
			break;
	}

	var sticker = cubestring.charAt(index);
	var colour;
	switch(sticker) {
		case "U":
			colour = "white"
			break;
		case "F":
			colour = "green"
			break;
		case "L":
			colour = "orange"
			break;
		case "R":
			colour = "red"
			break;
		case "B":
			colour = "blue"
			break;
		case "D":
			colour = "yellow"
			break;
	}
	fillSticker(x,y,colour)
}

function drawCube(cubestring){
	fillWithIndex(0,0,"l",1,cubestring);
	fillWithIndex(1,0,"u",1,cubestring);
	fillWithIndex(2,0,"u",2,cubestring);
	fillWithIndex(3,0,"u",3,cubestring);
	fillWithIndex(4,0,"r",3,cubestring);

	
	fillWithIndex(0,1,"l",2,cubestring);
	fillWithIndex(1,1,"u",4,cubestring);
	fillWithIndex(2,1,"u",5,cubestring);
	fillWithIndex(3,1,"u",6,cubestring);
	fillWithIndex(4,1,"r",2,cubestring);

	
	fillWithIndex(0,2,"l",3,cubestring);
	fillWithIndex(1,2,"u",7,cubestring);
	fillWithIndex(2,2,"u",8,cubestring);
	fillWithIndex(3,2,"u",9,cubestring);
	fillWithIndex(4,2,"r",1,cubestring);


	fillWithIndex(0,3,"l",3,cubestring);
	fillWithIndex(1,3,"f",1,cubestring);
	fillWithIndex(2,3,"f",2,cubestring);
	fillWithIndex(3,3,"f",3,cubestring);
	fillWithIndex(4,3,"r",1,cubestring);

	
	fillWithIndex(0,4,"l",6,cubestring);
	fillWithIndex(1,4,"f",4,cubestring);
	fillWithIndex(2,4,"f",5,cubestring);
	fillWithIndex(3,4,"f",6,cubestring);
	fillWithIndex(4,4,"r",4,cubestring);

	
	fillWithIndex(0,5,"l",9,cubestring);
	fillWithIndex(1,5,"f",7,cubestring);
	fillWithIndex(2,5,"f",8,cubestring);
	fillWithIndex(3,5,"f",9,cubestring);
	fillWithIndex(4,5,"r",7,cubestring);
	console.log(cubestring);
}

function doAlg(alg){
	cube.move(alg);
	drawCube(cube.asString());
}

drawCube(cube.asString());

var listener = new window.keypress.Listener();

listener.simple_combo("i", function() {	doAlg("R");});
listener.simple_combo("k", function() {	doAlg("R'");});
listener.simple_combo("j", function() {	doAlg("U");});
listener.simple_combo("f", function() {	doAlg("U'");});
listener.simple_combo("h", function() {	doAlg("F");});
listener.simple_combo("g", function() {	doAlg("F'");});
listener.simple_combo("w", function() {	doAlg("B");});
listener.simple_combo("o", function() {	doAlg("B'");});
listener.simple_combo("d", function() {	doAlg("L");});
listener.simple_combo("e", function() {	doAlg("L'");});
listener.simple_combo("s", function() {	doAlg("D");});
listener.simple_combo("l", function() {	doAlg("D'");});
listener.simple_combo("u", function() {	doAlg("r");});
listener.simple_combo("m", function() {	doAlg("r'");});
listener.simple_combo("c", function() {	doAlg("l");});
listener.simple_combo("r", function() {	doAlg("l'");});
listener.simple_combo("'", function() {	doAlg("M");});
listener.simple_combo("[", function() {	doAlg("M'");});
listener.simple_combo("t", function() {	doAlg("x");});
listener.simple_combo("n", function() {	doAlg("x'");});
listener.simple_combo(";", function() {	doAlg("y");});
listener.simple_combo("a", function() {	doAlg("y'");});
listener.simple_combo("p", function() {	doAlg("z");});
