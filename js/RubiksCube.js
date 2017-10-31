var currentRotation = "";
var cube = new RubiksCube();
var currentAlgorithm = "";//After an alg gets tested for the first time, it becomes the currentAlgorithm.
var algArr;//This is the array of alternatives to currentAlgorithm
var canvas = document.getElementById("cube");
var ctx = canvas.getContext("2d");
var stickerSize = 50;

createAlgsetPicker();
drawCube(cube.cubestate);
Cube.initSolver();

function fillSticker(x, y, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(stickerSize * x, stickerSize * y, stickerSize, stickerSize);
}
function fillWithIndex(x, y, face, index, cubeArray, shouldBeCleared = false) {
    index--;
    switch (face) {
        case "u":
            break;
        case "r":
            index += 9;
            break;
        case "f":
            index += 18;
            break;
        case "d":
            index += 27;
            break;
        case "l":
            index += 36;
            break;
        case "b":
            index += 45;
            break;
    }

    var sticker = cubeArray[index];
    var colour;
    switch (sticker) {
        case 1:
            colour = "white";
            break;
        case 2:
            colour = "red";
            break;
        case 3:
            colour = "green";
            break;
        case 4:
            colour = "yellow";
            break;
        case 5:
            colour = "orange";
            break;
        case 6:
            colour = "blue";
            break;
    }
    if(shouldBeCleared){
      colour = "black";
    }
    fillSticker(x, y, colour);
}
function drawCube(cubeArray) {
//Just Draw Corners when Doing 2x2
//TODO: Is this a good Idea? Is there a 2x2 draw thing already available for
//RubiksCube.js?
if(document.getElementById("cubeType").value == "2x2"){

  //Clear not used Elements
  fillWithIndex(0, 0, "l", 1, cubeArray,true);
  fillWithIndex(1, 0, "u", 1, cubeArray,true);
  fillWithIndex(2, 0, "u", 2, cubeArray,true);
  fillWithIndex(3, 0, "u", 3, cubeArray,true);
  fillWithIndex(4, 0, "r", 3, cubeArray,true);

  fillWithIndex(0, 1, "l", 2, cubeArray,true);
  fillWithIndex(1, 1, "u", 4, cubeArray,true);
  fillWithIndex(2, 1, "u", 5, cubeArray,true);
  fillWithIndex(3, 1, "u", 6, cubeArray,true);
  fillWithIndex(4, 1, "r", 2, cubeArray,true);

  fillWithIndex(0, 2, "l", 3, cubeArray,true);
  fillWithIndex(1, 2, "u", 7, cubeArray,true);
  fillWithIndex(2, 2, "u", 8, cubeArray,true);
  fillWithIndex(3, 2, "u", 9, cubeArray,true);
  fillWithIndex(4, 2, "r", 1, cubeArray,true);

  fillWithIndex(0, 3, "l", 3, cubeArray,true);
  fillWithIndex(1, 3, "f", 1, cubeArray,true);
  fillWithIndex(2, 3, "f", 2, cubeArray,true);
  fillWithIndex(3, 3, "f", 3, cubeArray,true);
  fillWithIndex(4, 3, "r", 1, cubeArray,true);

  fillWithIndex(0, 4, "l", 6, cubeArray,true);
  fillWithIndex(1, 4, "f", 4, cubeArray,true);
  fillWithIndex(2, 4, "f", 5, cubeArray,true);
  fillWithIndex(3, 4, "f", 6, cubeArray,true);
  fillWithIndex(4, 4, "r", 4, cubeArray,true);

  fillWithIndex(0, 5, "l", 9, cubeArray,true);
  fillWithIndex(1, 5, "f", 7, cubeArray,true);
  fillWithIndex(2, 5, "f", 8, cubeArray,true);
  fillWithIndex(3, 5, "f", 9, cubeArray,true);
  fillWithIndex(4, 5, "r", 7, cubeArray,true);

  //Draw 2x2
  fillWithIndex(0, 2, "l", 1, cubeArray);
  fillWithIndex(1, 2, "u", 1, cubeArray);
  fillWithIndex(2, 2, "u", 3, cubeArray);
  fillWithIndex(3, 2, "r", 3, cubeArray);

  fillWithIndex(0, 3, "l", 3, cubeArray);
  fillWithIndex(1, 3, "u", 7, cubeArray);
  fillWithIndex(2, 3, "u", 9, cubeArray);
  fillWithIndex(3, 3, "r", 1, cubeArray);

  fillWithIndex(0, 4, "l", 3, cubeArray);
  fillWithIndex(1, 4, "f", 1, cubeArray);
  fillWithIndex(2, 4, "f", 3, cubeArray);
  fillWithIndex(3, 4, "r", 1, cubeArray);

  fillWithIndex(0, 5, "l", 9, cubeArray);
  fillWithIndex(1, 5, "f", 7, cubeArray);
  fillWithIndex(2, 5, "f", 9, cubeArray);
  fillWithIndex(3, 5, "r", 7, cubeArray);

}else{
  fillWithIndex(0, 0, "l", 1, cubeArray);
  fillWithIndex(1, 0, "u", 1, cubeArray);
  fillWithIndex(2, 0, "u", 2, cubeArray);
  fillWithIndex(3, 0, "u", 3, cubeArray);
  fillWithIndex(4, 0, "r", 3, cubeArray);

  fillWithIndex(0, 1, "l", 2, cubeArray);
  fillWithIndex(1, 1, "u", 4, cubeArray);
  fillWithIndex(2, 1, "u", 5, cubeArray);
  fillWithIndex(3, 1, "u", 6, cubeArray);
  fillWithIndex(4, 1, "r", 2, cubeArray);

  fillWithIndex(0, 2, "l", 3, cubeArray);
  fillWithIndex(1, 2, "u", 7, cubeArray);
  fillWithIndex(2, 2, "u", 8, cubeArray);
  fillWithIndex(3, 2, "u", 9, cubeArray);
  fillWithIndex(4, 2, "r", 1, cubeArray);

  fillWithIndex(0, 3, "l", 3, cubeArray);
  fillWithIndex(1, 3, "f", 1, cubeArray);
  fillWithIndex(2, 3, "f", 2, cubeArray);
  fillWithIndex(3, 3, "f", 3, cubeArray);
  fillWithIndex(4, 3, "r", 1, cubeArray);

  fillWithIndex(0, 4, "l", 6, cubeArray);
  fillWithIndex(1, 4, "f", 4, cubeArray);
  fillWithIndex(2, 4, "f", 5, cubeArray);
  fillWithIndex(3, 4, "f", 6, cubeArray);
  fillWithIndex(4, 4, "r", 4, cubeArray);

  fillWithIndex(0, 5, "l", 9, cubeArray);
  fillWithIndex(1, 5, "f", 7, cubeArray);
  fillWithIndex(2, 5, "f", 8, cubeArray);
  fillWithIndex(3, 5, "f", 9, cubeArray);
  fillWithIndex(4, 5, "r", 7, cubeArray);
}
}


function doAlg(algorithm){
    cube.doAlgorithm(algorithm);
    drawCube(cube.cubestate);
}


function getRandAuf(letter){
    var rand = Math.floor(Math.random()*4);//pick 0,1,2 or 3
    var aufs = [letter + " ", letter +"' ",letter + "2 ", ""];
    return aufs[rand];
}
//This will return an algorithm that has the same effect as algorithm, but with different moves.

//This requires https://github.com/ldez/cubejs to work. The Cube.initSolver(); part takes a long time, so I removed it for the time being. 

function obfusticate(algorithm){

    Cube.initSolver();
    var rc = new RubiksCube();
    rc.doAlgorithm(algorithm);
    orient = alg.cube.invert(rc.wcaOrient());
    return (alg.cube.invert(rc.solution()) + orient).replace(/2'/g, "2");
}

function pickAlg(algstr, sep, algNo){
	return algstr.split(sep)[algNo - 1];
}

function addAUFs(algArr){

	var rand1 = getRandAuf("U");
	var rand2 = getRandAuf("U");
	//algorithm = getRandAuf() + algorithm + " " +  getRandAuf()
	var i = 0;
	for (;i<algArr.length;i++){
		algArr[i] = alg.cube.simplify(rand1 + algArr[i] + " " + rand2); 
	}
	return algArr;
}
function testAlg(algstr, auf){
    algArr = algstr.split("/");
	algArr = fixAlgorithms(algArr);

    cube.resetCube();
    if (auf){
		algArr = addAUFs(algArr);
		currentRotation = getRandAuf("y")
		doAlg(currentRotation);
    }

	algorithm = algArr[0];
    var inverse = alg.cube.invert(algorithm);
    var scrP = document.getElementById("scramble");
    if (document.getElementById("showScramble").checked){
        scramble = alg.cube.simplify(inverse);
		if(document.getElementById("realScrambles").checked){
			scramble = obfusticate(scramble);
		}
        scrP.innerHTML = scramble;
    } else{
        scrP.innerHTML = "";
    }


    doAlg(inverse);
    drawCube(cube.cubestate)
    console.log(algorithm);
    currentAlgorithm = algorithm;
    //updateVisualCube(algorithm)

}

function reTestAlg(){
    cube.resetCube();
	doAlg(currentRotation);
    doAlg(alg.cube.invert(currentAlgorithm));
    drawCube(cube.cubestate)

}
function fixAlgorithms(algorithms){
	//for now this just removes brackets
	var i = 0;
	for (;i<algArr.length;i++){
    	algorithms[i] = algorithms[i].replace(/\[|\]|\)|\(/g, "");
	}
	return algorithms;
    //TODO Allow commutators

}

function updateVisualCube(algorithm){
    imgsrc = "http://cube.crider.co.uk/visualcube.php?fmt=svg&size=300&view=plan&bg=black&case=" + algorithm;
    document.getElementById("visualcube").src=imgsrc;
}
function displayAlgorithm(){
	if (algArr == null){
		return;
	}
    //show solution
    var x = document.getElementById("algdisp");
    x.innerHTML = algArr.join("<br>");
    reTestAlg();

    //show scramble
    var y = document.getElementById("scramble");
    scramble = alg.cube.simplify(alg.cube.invert(algArr[0]));
	if(document.getElementById("realScrambles").checked){
		scramble = obfusticate(scramble);
	}
    y.innerHTML = scramble;
}
function testRandomFromList(set){
    var x = document.getElementById("algdisp");
    x.innerHTML = "";
    size = set.length;
    rand = Math.floor(Math.random()*size);
    testAlg(set[rand], document.getElementById("randAUF").checked);
    //TODO Allow commutators to be parsed by alg.js.
    return set[rand];

}

//Create Checkboxes for each subset
//Each subset has id of subset name, and is followed by text of subset name.

function createAlgsetPicker(){
    var algsetPicker = document.getElementById("algsetpicker")
    for (var set in window.algs){
        var option = document.createElement("option")
        option.text = set;
        algsetPicker.add(option);
        
    }
    algsetPicker.size = Object.keys(window.algs).length
}



function createCheckboxes(){
    var set = document.getElementById("algsetpicker").value;
    console.log("createCheckboxes() called")
    
    var subsets = Object.keys(window.algs[set]);
    
    var myDiv = document.getElementById("cboxes");
    myDiv.innerHTML = "";
    
    for (var i = 0; i < subsets.length; i++) {
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.value = subsets[i];
        
        checkBox.setAttribute("id", set.toLowerCase() +  subsets[i]);
        console.log("id" + checkBox.id);
        myDiv.appendChild(checkBox);
        myDiv.appendChild(label);
        label.appendChild(document.createTextNode(subsets[i]));
    }
}

function createCheckboxes2(){
  for(var set in window.algs){
    var title = document.createElement("span");
    title.innerHTML = set + ":";
    document.body.appendChild(title);
    for (var subset in window.algs[set]){
        if (window.algs[set].hasOwnProperty(subset)) {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "checkbox");
            x.setAttribute("id", set.toLowerCase() +  subset);
            document.body.appendChild(x);

            var setName = document.createTextNode(subset);
            document.body.appendChild(setName);
        }
    }
    document.body.appendChild(document.createElement("BR"));
  }
}
//createCheckboxes();
function createAlgList(){
    algList = [];


    var set = document.getElementById("algsetpicker").value;
    for (var subset in window.algs[set]){
        console.log("in algist" + set.toLowerCase() + subset);
        if(document.getElementById(set.toLowerCase() + subset).checked){
            algList = algList.concat(window.algs[set][subset]);
        }
    }
    
    if(algList.length < 1){ //if nothing checked, just do T perm
        for (var subset in window.algs[set]){
            algList = algList.concat(window.algs[set][subset]);
        }
        return algList;
    }

    return algList;
}

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
listener.simple_combo("v", function() {	doAlg("l");});
listener.simple_combo("r", function() {	doAlg("l'");});
listener.simple_combo("`", function() {	doAlg("M");});
listener.simple_combo("'", function() {	doAlg("M");});
listener.simple_combo("[", function() {	doAlg("M'");});
listener.simple_combo("t", function() {	doAlg("x");});
listener.simple_combo("n", function() {	doAlg("x'");});
listener.simple_combo(";", function() {	doAlg("y");});
listener.simple_combo("a", function() {	doAlg("y'");});
listener.simple_combo("p", function() {	doAlg("z");});
listener.simple_combo("q", function() {	doAlg("z'");});
listener.simple_combo("esc", function() {
    reTestAlg();
    document.getElementById("scramble").innerHTML = "";
    document.getElementById("algdisp").innerHTML = "";

});

listener.simple_combo("space", function() {

    displayAlgorithm();

});
listener.simple_combo("enter", function() {
    testRandomFromList(createAlgList());
});
listener.simple_combo("tab", function() {
    testRandomFromList(createAlgList());
});

//CUBE OBJECT
function RubiksCube() {
    this.cubestate = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6];

    this.resetCube = function(){
        this.cubestate = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6];
    }
    this.solution = function(){
        var gcube = Cube.fromString(this.toString());
        return gcube.solve();
    }
    this.wcaOrient = function() {
		// u-r--f--d--l--b
		// 4 13 22 31 40 49
		//
		var moves = "";

		if (cubestate[13]=="1") {//R face
			this.doAlgorithm("z'");
			moves +="z'";
		} else if (cubestate[22]=="1") {//on F face
			this.doAlgorithm("x");
			moves+="x";
		} else if (cubestate[31]=="1") {//on D face
			this.doAlgorithm("x2");
			moves+="x2";
		} else if (cubestate[40]=="1") {//on L face
			this.doAlgorithm("z");
			moves+="z";
		} else if (cubestate[49]=="1") {//on B face
			this.doAlgorithm("x'");
			moves+="x'";
		}

		if (cubestate[13]=="3") {//R face
			this.doAlgorithm("y");
			moves+="y";
		} else if (cubestate[40]=="3") {//on L face
			this.doAlgorithm("y'");
			moves+="y'";
		} else if (cubestate[49]=="3") {//on B face
			this.doAlgorithm("y2");
			moves+="y2";
		}

		return moves;
	}
	this.toString = function(){
		var str = "";
		var i;
		var sides = ["U","R","F","D","L","B"]
		for(i=0;i<this.cubestate.length;i++){
			str+=sides[this.cubestate[i]-1];
		}
		return str;

	}


    this.test = function(alg){
        this.doAlgorithm(alg);
        drawCube(this.cubestate);
    }

    this.doAlgorithm = function(alg) {
		var moveArr = alg.split(/(?=[A-Za-z])/);
    var i;

		for (i = 0;i<moveArr.length;i++) {
            var move = moveArr[i];
            var myRegexp = /([RUFBLDrufbldxyzEMS])(\d*)('?)/g;
            var match = myRegexp.exec(move.trim());


			if (match!=null) {

				var side = match[1];

				var times = 1;
				if (!match[2]=="") {
					times = match[2] % 4;
				}

				if (match[3]=="'") {
					times = (4 - times) % 4;
				}

				switch (side) {
				case "R":
					this.doR(times);
					break;
				case "U":
					this.doU(times);
					break;
				case "F":
					this.doF(times);
					break;
				case "B":
					this.doB(times);
					break;
				case "L":
					this.doL(times);
					break;
				case "D":
					this.doD(times);
					break;
				case "r":
					this.doRw(times);
					break;
				case "u":
					this.doUw(times);
					break;
				case "f":
					this.doFw(times);
					break;
				case "b":
					this.doBw(times);
					break;
				case "l":
					this.doLw(times);
					break;
				case "d":
					this.doDw(times);
					break;
				case "x":
					this.doX(times);
					break;
				case "y":
					this.doY(times);
					break;
				case "z":
					this.doZ(times);
					break;
				case "E":
					this.doE(times);
					break;
				case "M":
					this.doM(times);
					break;
				case "S":
					this.doS(times);
					break;

				}
			} else {

				console.log("Invalid alg, or no alg specified");

			}

		}

	}

    this.solveNoRotate = function(){
		//Center sticker indexes: 4, 13, 22, 31, 40, 49
        cubestate = this.cubestate;
		this.cubestate = [cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],
			cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],
			cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],
			cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],
			cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],
			cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49]];
	}

    this.doU = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[6], cubestate[3], cubestate[0], cubestate[7], cubestate[4], cubestate[1], cubestate[8], cubestate[5], cubestate[2], cubestate[45], cubestate[46], cubestate[47], cubestate[12], cubestate[13], cubestate[14], cubestate[15], cubestate[16], cubestate[17], cubestate[9], cubestate[10], cubestate[11], cubestate[21], cubestate[22], cubestate[23], cubestate[24], cubestate[25], cubestate[26], cubestate[27], cubestate[28], cubestate[29], cubestate[30], cubestate[31], cubestate[32], cubestate[33], cubestate[34], cubestate[35], cubestate[18], cubestate[19], cubestate[20], cubestate[39], cubestate[40], cubestate[41], cubestate[42], cubestate[43], cubestate[44], cubestate[36], cubestate[37], cubestate[38], cubestate[48], cubestate[49], cubestate[50], cubestate[51], cubestate[52], cubestate[53]];
        }

    }

    this.doR = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;

            this.cubestate = [cubestate[0], cubestate[1], cubestate[20], cubestate[3], cubestate[4], cubestate[23], cubestate[6], cubestate[7], cubestate[26], cubestate[15], cubestate[12], cubestate[9], cubestate[16], cubestate[13], cubestate[10], cubestate[17], cubestate[14], cubestate[11], cubestate[18], cubestate[19], cubestate[29], cubestate[21], cubestate[22], cubestate[32], cubestate[24], cubestate[25], cubestate[35], cubestate[27], cubestate[28], cubestate[51], cubestate[30], cubestate[31], cubestate[48], cubestate[33], cubestate[34], cubestate[45], cubestate[36], cubestate[37], cubestate[38], cubestate[39], cubestate[40], cubestate[41], cubestate[42], cubestate[43], cubestate[44], cubestate[8], cubestate[46], cubestate[47], cubestate[5], cubestate[49], cubestate[50], cubestate[2], cubestate[52], cubestate[53]]
        }

    }

    this.doF = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[0], cubestate[1], cubestate[2], cubestate[3], cubestate[4], cubestate[5], cubestate[44], cubestate[41], cubestate[38], cubestate[6], cubestate[10], cubestate[11], cubestate[7], cubestate[13], cubestate[14], cubestate[8], cubestate[16], cubestate[17], cubestate[24], cubestate[21], cubestate[18], cubestate[25], cubestate[22], cubestate[19], cubestate[26], cubestate[23], cubestate[20], cubestate[15], cubestate[12], cubestate[9], cubestate[30], cubestate[31], cubestate[32], cubestate[33], cubestate[34], cubestate[35], cubestate[36], cubestate[37], cubestate[27], cubestate[39], cubestate[40], cubestate[28], cubestate[42], cubestate[43], cubestate[29], cubestate[45], cubestate[46], cubestate[47], cubestate[48], cubestate[49], cubestate[50], cubestate[51], cubestate[52], cubestate[53]];
        }

    }

    this.doD = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[0], cubestate[1], cubestate[2], cubestate[3], cubestate[4], cubestate[5], cubestate[6], cubestate[7], cubestate[8], cubestate[9], cubestate[10], cubestate[11], cubestate[12], cubestate[13], cubestate[14], cubestate[24], cubestate[25], cubestate[26], cubestate[18], cubestate[19], cubestate[20], cubestate[21], cubestate[22], cubestate[23], cubestate[42], cubestate[43], cubestate[44], cubestate[33], cubestate[30], cubestate[27], cubestate[34], cubestate[31], cubestate[28], cubestate[35], cubestate[32], cubestate[29], cubestate[36], cubestate[37], cubestate[38], cubestate[39], cubestate[40], cubestate[41], cubestate[51], cubestate[52], cubestate[53], cubestate[45], cubestate[46], cubestate[47], cubestate[48], cubestate[49], cubestate[50], cubestate[15], cubestate[16], cubestate[17]];
        }

    }

    this.doL = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[53], cubestate[1], cubestate[2], cubestate[50], cubestate[4], cubestate[5], cubestate[47], cubestate[7], cubestate[8], cubestate[9], cubestate[10], cubestate[11], cubestate[12], cubestate[13], cubestate[14], cubestate[15], cubestate[16], cubestate[17], cubestate[0], cubestate[19], cubestate[20], cubestate[3], cubestate[22], cubestate[23], cubestate[6], cubestate[25], cubestate[26], cubestate[18], cubestate[28], cubestate[29], cubestate[21], cubestate[31], cubestate[32], cubestate[24], cubestate[34], cubestate[35], cubestate[42], cubestate[39], cubestate[36], cubestate[43], cubestate[40], cubestate[37], cubestate[44], cubestate[41], cubestate[38], cubestate[45], cubestate[46], cubestate[33], cubestate[48], cubestate[49], cubestate[30], cubestate[51], cubestate[52], cubestate[27]];
        }

    }

    this.doB = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[11], cubestate[14], cubestate[17], cubestate[3], cubestate[4], cubestate[5], cubestate[6], cubestate[7], cubestate[8], cubestate[9], cubestate[10], cubestate[35], cubestate[12], cubestate[13], cubestate[34], cubestate[15], cubestate[16], cubestate[33], cubestate[18], cubestate[19], cubestate[20], cubestate[21], cubestate[22], cubestate[23], cubestate[24], cubestate[25], cubestate[26], cubestate[27], cubestate[28], cubestate[29], cubestate[30], cubestate[31], cubestate[32], cubestate[36], cubestate[39], cubestate[42], cubestate[2], cubestate[37], cubestate[38], cubestate[1], cubestate[40], cubestate[41], cubestate[0], cubestate[43], cubestate[44], cubestate[51], cubestate[48], cubestate[45], cubestate[52], cubestate[49], cubestate[46], cubestate[53], cubestate[50], cubestate[47]];
        }

    }

    this.doE = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[0], cubestate[1], cubestate[2], cubestate[3], cubestate[4], cubestate[5], cubestate[6], cubestate[7], cubestate[8], cubestate[9], cubestate[10], cubestate[11], cubestate[21], cubestate[22], cubestate[23], cubestate[15], cubestate[16], cubestate[17], cubestate[18], cubestate[19], cubestate[20], cubestate[39], cubestate[40], cubestate[41], cubestate[24], cubestate[25], cubestate[26], cubestate[27], cubestate[28], cubestate[29], cubestate[30], cubestate[31], cubestate[32], cubestate[33], cubestate[34], cubestate[35], cubestate[36], cubestate[37], cubestate[38], cubestate[48], cubestate[49], cubestate[50], cubestate[42], cubestate[43], cubestate[44], cubestate[45], cubestate[46], cubestate[47], cubestate[12], cubestate[13], cubestate[14], cubestate[51], cubestate[52], cubestate[53]];
        }

    }

    this.doM = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[0], cubestate[52], cubestate[2], cubestate[3], cubestate[49], cubestate[5], cubestate[6], cubestate[46], cubestate[8], cubestate[9], cubestate[10], cubestate[11], cubestate[12], cubestate[13], cubestate[14], cubestate[15], cubestate[16], cubestate[17], cubestate[18], cubestate[1], cubestate[20], cubestate[21], cubestate[4], cubestate[23], cubestate[24], cubestate[7], cubestate[26], cubestate[27], cubestate[19], cubestate[29], cubestate[30], cubestate[22], cubestate[32], cubestate[33], cubestate[25], cubestate[35], cubestate[36], cubestate[37], cubestate[38], cubestate[39], cubestate[40], cubestate[41], cubestate[42], cubestate[43], cubestate[44], cubestate[45], cubestate[34], cubestate[47], cubestate[48], cubestate[31], cubestate[50], cubestate[51], cubestate[28], cubestate[53]];
        }

    }

    this.doS = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.cubestate = [cubestate[0], cubestate[1], cubestate[2], cubestate[43], cubestate[40], cubestate[37], cubestate[6], cubestate[7], cubestate[8], cubestate[9], cubestate[3], cubestate[11], cubestate[12], cubestate[4], cubestate[14], cubestate[15], cubestate[5], cubestate[17], cubestate[18], cubestate[19], cubestate[20], cubestate[21], cubestate[22], cubestate[23], cubestate[24], cubestate[25], cubestate[26], cubestate[27], cubestate[28], cubestate[29], cubestate[16], cubestate[13], cubestate[10], cubestate[33], cubestate[34], cubestate[35], cubestate[36], cubestate[30], cubestate[38], cubestate[39], cubestate[31], cubestate[41], cubestate[42], cubestate[32], cubestate[44], cubestate[45], cubestate[46], cubestate[47], cubestate[48], cubestate[49], cubestate[50], cubestate[51], cubestate[52], cubestate[53]];
        }

    }

    this.doX = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doR(1);
            this.doM(3);
            this.doL(3);
        }
    }

    this.doY = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;

            this.doU(1);
            this.doE(3);
            this.doD(3);
        }
    }

    this.doZ = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;

            this.doF(1);
            this.doS(1);
            this.doB(3);
        }
    }

    this.doUw = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doE(3);
            this.doU(1);

        }

    }

    this.doRw = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doM(3);
            this.doR(1);
        }

    }

    this.doFw = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doS(1);
            this.doF(1);
        }

    }

    this.doDw = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doE(1);
            this.doD(1);
        }

    }

    this.doLw = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doM(1);
            this.doL(1);
        }

    }

    this.doBw = function(times) {
        var i;
        for (i = 0; i < times; i++) {
        cubestate = this.cubestate;
            this.doS(3);
            this.doB(1);
        }

    }
}
