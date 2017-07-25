(function(){

	solved = [1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6];
	var currentRotation = 0;
	var cube=solved;
	var currentAlgorithm = "";
	var canvas = document.getElementById("cube");
	var ctx = canvas.getContext("2d");
	var stickerSize = 50;

	function solveNoRotate(cubestate){
		//Center sticker indexes: 4, 13, 22, 31, 40, 49
		cubestate = [cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],cubestate[4],
			cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],cubestate[13],
			cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],cubestate[22],
			cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],cubestate[31],
			cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],cubestate[40],
			cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49],cubestate[49]]
		return cubestate;
	}
	function doU (cubestate){
		cubestate = [cubestate[6],cubestate[3],cubestate[0],cubestate[7],cubestate[4],cubestate[1],cubestate[8],cubestate[5],cubestate[2],cubestate[45],cubestate[46],cubestate[47],cubestate[12],cubestate[13],cubestate[14],cubestate[15],cubestate[16],cubestate[17],cubestate[9],cubestate[10],cubestate[11],cubestate[21],cubestate[22],cubestate[23],cubestate[24],cubestate[25],cubestate[26],cubestate[27],cubestate[28],cubestate[29],cubestate[30],cubestate[31],cubestate[32],cubestate[33],cubestate[34],cubestate[35],cubestate[18],cubestate[19],cubestate[20],cubestate[39],cubestate[40],cubestate[41],cubestate[42],cubestate[43],cubestate[44],cubestate[36],cubestate[37],cubestate[38],cubestate[48],cubestate[49],cubestate[50],cubestate[51],cubestate[52],cubestate[53]]
		return cubestate;
	}
	function doR (cubestate){
		cubestate = [cubestate[0],cubestate[1],cubestate[20],cubestate[3],cubestate[4],cubestate[23],cubestate[6],cubestate[7],cubestate[26],cubestate[15],cubestate[12],cubestate[9],cubestate[16],cubestate[13],cubestate[10],cubestate[17],cubestate[14],cubestate[11],cubestate[18],cubestate[19],cubestate[29],cubestate[21],cubestate[22],cubestate[32],cubestate[24],cubestate[25],cubestate[35],cubestate[27],cubestate[28],cubestate[51],cubestate[30],cubestate[31],cubestate[48],cubestate[33],cubestate[34],cubestate[45],cubestate[36],cubestate[37],cubestate[38],cubestate[39],cubestate[40],cubestate[41],cubestate[42],cubestate[43],cubestate[44],cubestate[8],cubestate[46],cubestate[47],cubestate[5],cubestate[49],cubestate[50],cubestate[2],cubestate[52],cubestate[53]]
		return cubestate;
	}
	function doF (cubestate){
		cubestate = [cubestate[0],cubestate[1],cubestate[2],cubestate[3],cubestate[4],cubestate[5],cubestate[44],cubestate[41],cubestate[38],cubestate[6],cubestate[10],cubestate[11],cubestate[7],cubestate[13],cubestate[14],cubestate[8],cubestate[16],cubestate[17],cubestate[24],cubestate[21],cubestate[18],cubestate[25],cubestate[22],cubestate[19],cubestate[26],cubestate[23],cubestate[20],cubestate[15],cubestate[12],cubestate[9],cubestate[30],cubestate[31],cubestate[32],cubestate[33],cubestate[34],cubestate[35],cubestate[36],cubestate[37],cubestate[27],cubestate[39],cubestate[40],cubestate[28],cubestate[42],cubestate[43],cubestate[29],cubestate[45],cubestate[46],cubestate[47],cubestate[48],cubestate[49],cubestate[50],cubestate[51],cubestate[52],cubestate[53]];
		return cubestate;
	}
	function doD (cubestate){
		cubestate = [cubestate[0],cubestate[1],cubestate[2],cubestate[3],cubestate[4],cubestate[5],cubestate[6],cubestate[7],cubestate[8],cubestate[9],cubestate[10],cubestate[11],cubestate[12],cubestate[13],cubestate[14],cubestate[24],cubestate[25],cubestate[26],cubestate[18],cubestate[19],cubestate[20],cubestate[21],cubestate[22],cubestate[23],cubestate[42],cubestate[43],cubestate[44],cubestate[33],cubestate[30],cubestate[27],cubestate[34],cubestate[31],cubestate[28],cubestate[35],cubestate[32],cubestate[29],cubestate[36],cubestate[37],cubestate[38],cubestate[39],cubestate[40],cubestate[41],cubestate[51],cubestate[52],cubestate[53],cubestate[45],cubestate[46],cubestate[47],cubestate[48],cubestate[49],cubestate[50],cubestate[15],cubestate[16],cubestate[17]];
		return cubestate;
	}
	function doL (cubestate){
		cubestate = [cubestate[53],cubestate[1],cubestate[2],cubestate[50],cubestate[4],cubestate[5],cubestate[47],cubestate[7],cubestate[8],cubestate[9],cubestate[10],cubestate[11],cubestate[12],cubestate[13],cubestate[14],cubestate[15],cubestate[16],cubestate[17],cubestate[0],cubestate[19],cubestate[20],cubestate[3],cubestate[22],cubestate[23],cubestate[6],cubestate[25],cubestate[26],cubestate[18],cubestate[28],cubestate[29],cubestate[21],cubestate[31],cubestate[32],cubestate[24],cubestate[34],cubestate[35],cubestate[42],cubestate[39],cubestate[36],cubestate[43],cubestate[40],cubestate[37],cubestate[44],cubestate[41],cubestate[38],cubestate[45],cubestate[46],cubestate[33],cubestate[48],cubestate[49],cubestate[30],cubestate[51],cubestate[52],cubestate[27]];
		return cubestate;
	}
	function doB (cubestate){
		cubestate = [cubestate[11],cubestate[14],cubestate[17],cubestate[3],cubestate[4],cubestate[5],cubestate[6],cubestate[7],cubestate[8],cubestate[9],cubestate[10],cubestate[35],cubestate[12],cubestate[13],cubestate[34],cubestate[15],cubestate[16],cubestate[33],cubestate[18],cubestate[19],cubestate[20],cubestate[21],cubestate[22],cubestate[23],cubestate[24],cubestate[25],cubestate[26],cubestate[27],cubestate[28],cubestate[29],cubestate[30],cubestate[31],cubestate[32],cubestate[36],cubestate[39],cubestate[42],cubestate[2],cubestate[37],cubestate[38],cubestate[1],cubestate[40],cubestate[41],cubestate[0],cubestate[43],cubestate[44],cubestate[51],cubestate[48],cubestate[45],cubestate[52],cubestate[49],cubestate[46],cubestate[53],cubestate[50],cubestate[47]];
		return cubestate;
	}
	function doE (cubestate){
		cubestate = [cubestate[0],cubestate[1],cubestate[2],cubestate[3],cubestate[4],cubestate[5],cubestate[6],cubestate[7],cubestate[8],cubestate[9],cubestate[10],cubestate[11],cubestate[21],cubestate[22],cubestate[23],cubestate[15],cubestate[16],cubestate[17],cubestate[18],cubestate[19],cubestate[20],cubestate[39],cubestate[40],cubestate[41],cubestate[24],cubestate[25],cubestate[26],cubestate[27],cubestate[28],cubestate[29],cubestate[30],cubestate[31],cubestate[32],cubestate[33],cubestate[34],cubestate[35],cubestate[36],cubestate[37],cubestate[38],cubestate[48],cubestate[49],cubestate[50],cubestate[42],cubestate[43],cubestate[44],cubestate[45],cubestate[46],cubestate[47],cubestate[12],cubestate[13],cubestate[14],cubestate[51],cubestate[52],cubestate[53]];
		return cubestate;
	}
	function doM (cubestate){
		cubestate = [cubestate[0],cubestate[52],cubestate[2],cubestate[3],cubestate[49],cubestate[5],cubestate[6],cubestate[46],cubestate[8],cubestate[9],cubestate[10],cubestate[11],cubestate[12],cubestate[13],cubestate[14],cubestate[15],cubestate[16],cubestate[17],cubestate[18],cubestate[1],cubestate[20],cubestate[21],cubestate[4],cubestate[23],cubestate[24],cubestate[7],cubestate[26],cubestate[27],cubestate[19],cubestate[29],cubestate[30],cubestate[22],cubestate[32],cubestate[33],cubestate[25],cubestate[35],cubestate[36],cubestate[37],cubestate[38],cubestate[39],cubestate[40],cubestate[41],cubestate[42],cubestate[43],cubestate[44],cubestate[45],cubestate[34],cubestate[47],cubestate[48],cubestate[31],cubestate[50],cubestate[51],cubestate[28],cubestate[53]];
		return cubestate;
	}
	function doS (cubestate){
		cubestate = [cubestate[0],cubestate[1],cubestate[2],cubestate[43],cubestate[40],cubestate[37],cubestate[6],cubestate[7],cubestate[8],cubestate[9],cubestate[3],cubestate[11],cubestate[12],cubestate[4],cubestate[14],cubestate[15],cubestate[5],cubestate[17],cubestate[18],cubestate[19],cubestate[20],cubestate[21],cubestate[22],cubestate[23],cubestate[24],cubestate[25],cubestate[26],cubestate[27],cubestate[28],cubestate[29],cubestate[16],cubestate[13],cubestate[10],cubestate[33],cubestate[34],cubestate[35],cubestate[36],cubestate[30],cubestate[38],cubestate[39],cubestate[31],cubestate[41],cubestate[42],cubestate[32],cubestate[44],cubestate[45],cubestate[46],cubestate[47],cubestate[48],cubestate[49],cubestate[50],cubestate[51],cubestate[52],cubestate[53]];
		return cubestate;
	}
	function doX (cubestate){
		return doM(doM(doM(doL(doL(doL(doR(cubestate)))))));
	}
	function doY (cubestate){
		return doU(doD(doD(doD(doE(doE(doE(cubestate)))))));
	}
	function doZ (cubestate){
		return doF(doB(doB(doB(doS(cubestate)))));
	}

	function fillSticker(x, y, colour){
		ctx.fillStyle = colour;
		ctx.fillRect(stickerSize * x,stickerSize * y,stickerSize,stickerSize);
	}
	function fillWithIndex(x, y, face, index, cubeArray){
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

		var sticker = cubeArray[index];
		var colour;
		switch(sticker) {
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
		fillSticker(x,y,colour);
	}
	function drawCube(cubeArray){
		fillWithIndex(0,0,"l",1,cubeArray);
		fillWithIndex(1,0,"u",1,cubeArray);
		fillWithIndex(2,0,"u",2,cubeArray);
		fillWithIndex(3,0,"u",3,cubeArray);
		fillWithIndex(4,0,"r",3,cubeArray);


		fillWithIndex(0,1,"l",2,cubeArray);
		fillWithIndex(1,1,"u",4,cubeArray);
		fillWithIndex(2,1,"u",5,cubeArray);
		fillWithIndex(3,1,"u",6,cubeArray);
		fillWithIndex(4,1,"r",2,cubeArray);


		fillWithIndex(0,2,"l",3,cubeArray);
		fillWithIndex(1,2,"u",7,cubeArray);
		fillWithIndex(2,2,"u",8,cubeArray);
		fillWithIndex(3,2,"u",9,cubeArray);
		fillWithIndex(4,2,"r",1,cubeArray);


		fillWithIndex(0,3,"l",3,cubeArray);
		fillWithIndex(1,3,"f",1,cubeArray);
		fillWithIndex(2,3,"f",2,cubeArray);
		fillWithIndex(3,3,"f",3,cubeArray);
		fillWithIndex(4,3,"r",1,cubeArray);


		fillWithIndex(0,4,"l",6,cubeArray);
		fillWithIndex(1,4,"f",4,cubeArray);
		fillWithIndex(2,4,"f",5,cubeArray);
		fillWithIndex(3,4,"f",6,cubeArray);
		fillWithIndex(4,4,"r",4,cubeArray);


		fillWithIndex(0,5,"l",9,cubeArray);
		fillWithIndex(1,5,"f",7,cubeArray);
		fillWithIndex(2,5,"f",8,cubeArray);
		fillWithIndex(3,5,"f",9,cubeArray);
		fillWithIndex(4,5,"r",7,cubeArray);
	}
	function doMove(move){
		var times = 1;
		if (move.indexOf("2") > -1){
			times = 2;
			move = move.substring(0,1);
		}
		else if (move.endsWith("'")){
			move = move.substring(0,1);
			times = 3;
		}
		for (var i = 0; i < times; i++){
			switch(move){
				case "U":
					cube = doU(cube);
					break;
				case "R":
					cube = doR(cube);
					break;
				case "F":
					cube = doF(cube);
					break;
				case "D":
					cube = doD(cube);
					break;
				case "L":
					cube = doL(cube);
					break;
				case "B":
					cube = doB(cube);
					break;
				case "x":
					cube = doX(cube);
					break;
				case "y":
					cube = doY(cube);
					break;
				case "z":
					cube = doZ(cube);
					break;
				case "r":
					cube = doM(doM(doM(doR(cube))));
					break;
				case "l":
					cube = doL(doM(cube));
					break;
				case "u":
					cube = doU(doE(doE(doE(cube))));
					break;
				case "f":
					cube = doF(doS(cube));
					break;
				case "d":
					cube = doD(doE(cube));
					break;
				case "b":
					cube = doB(doS(doS(doS(cube))));
					break;
				case "M": 
					cube = doM(cube);
					break;
				case "E": 
					cube = doE(cube);
					break;
				case "S": 
					cube = doS(cube);
					break;
			}
		}


		drawCube(cube);
	}
	function doAlg(algorithm){
		arr =  fixAlgorithm(algorithm).split(/(?=[A-Za-z])| /);

		for(var i = 0; i<arr.length;i++){
			doMove(arr[i])
		}
	}
	drawCube(cube);

	function testAlg(algorithm, auf){
		algorithm = fixAlgorithm(algorithm);
		cube = solved;
		if (auf){

			rand = Math.floor(Math.random()*4);//pick 0,1 or 2
			var aufs = ["U ", "U' ","U2 ", ""];
			algorithm = aufs[rand] + algorithm;
			rand2 = Math.floor(Math.random()*4);//pick 0,1 or 2
			currentRotation = rand2;
			switch(rand2){
				case 1:
					cube = doY(cube);
					break;
				case 2:
					cube = doY(doY(cube));
					break;
				case 3:
					cube = doY(doY(doY(cube)));
					break;
				case 4:
					break;
			}

		}

		var inverse = alg.cube.invert(algorithm);	
		var scrP = document.getElementById("scramble");
		if (document.getElementById("showScramble").checked){
			scrP.innerHTML = inverse;
		} else{
			scrP.innerHTML = "";
		}


		doAlg(inverse);
		drawCube(cube);
		console.log(algorithm);
		currentAlgorithm = algorithm;

	}
	function fixAlgorithm(algorithm){
		return algorithm.replace(/\[|\]|\)|\(/g, "");
		//TODO Allow commutators

	}

	function reTestAlg(){
		cube = solved;
		switch(currentRotation){
			case 1:
				cube = doY(cube);
				break;
			case 2:
				cube = doY(doY(cube));
				break;
			case 3:
				cube = doY(doY(doY(cube)));
				break;
			case 4:
				break;
		}
		doAlg(alg.cube.invert(currentAlgorithm));
		drawCube(cube);

	}
	function displayAlgorithm(){
		//show solution
		var x = document.getElementById("algdisp");
		x.innerHTML = alg.cube.simplify(currentAlgorithm);
		reTestAlg();

		//show scramble
		var y = document.getElementById("scramble");
		y.innerHTML = alg.cube.simplify(alg.cube.invert(currentAlgorithm));
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

	function createCheckbox(id) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "checkbox");
		x.setAttribute("id", id);
		document.body.appendChild(x);
	}

	//Create Checkboxes for each subset
	//Each subset has id of subset name, and is followed by text of subset name.
	function createCheckboxes(){
		for (var subset in window.zbll_full){
			if (window.zbll_full.hasOwnProperty(subset)) {
				var x = document.createElement("INPUT");
				x.setAttribute("type", "checkbox");
				x.setAttribute("id", "zbll" +  subset);
				document.body.appendChild(x);

				var setName = document.createTextNode(subset);
				document.body.appendChild(setName);
			}
		}
	}
	createCheckboxes();
	function createAlgList(){
		algList = [];

		for (var subset in window.zbll_full){
			
			if(document.getElementById("zbll" + subset).checked){
				algList = algList.concat(zbll_full[subset]);

			}

		}
		if(algList.length < 1){ //if nothing checked, just do T perm
			algList = ["R U R' U' R' F R2 U' R' U' R U R' F'"];
		}
		
		return algList;
	}

	var listener = new window.keypress.Listener();
	listener.simple_combo("i", function() {	doMove("R");});
	listener.simple_combo("k", function() {	doMove("R'");});
	listener.simple_combo("j", function() {	doMove("U");});
	listener.simple_combo("f", function() {	doMove("U'");});
	listener.simple_combo("h", function() {	doMove("F");});
	listener.simple_combo("g", function() {	doMove("F'");});
	listener.simple_combo("w", function() {	doMove("B");});
	listener.simple_combo("o", function() {	doMove("B'");});
	listener.simple_combo("d", function() {	doMove("L");});
	listener.simple_combo("e", function() {	doMove("L'");});
	listener.simple_combo("s", function() {	doMove("D");});
	listener.simple_combo("l", function() {	doMove("D'");});
	listener.simple_combo("u", function() {	doMove("r");});
	listener.simple_combo("m", function() {	doMove("r'");});
	listener.simple_combo("v", function() {	doMove("l");});
	listener.simple_combo("r", function() {	doMove("l'");});
	listener.simple_combo("`", function() {	doMove("M");});
	listener.simple_combo("[", function() {	doMove("M'");});
	listener.simple_combo("t", function() {	doMove("x");});
	listener.simple_combo("n", function() {	doMove("x'");});
	listener.simple_combo(";", function() {	doMove("y");});
	listener.simple_combo("a", function() {	doMove("y'");});
	listener.simple_combo("p", function() {	doMove("z");});
	listener.simple_combo("q", function() {	doMove("z'");});
	listener.simple_combo("esc", function() {
		reTestAlg();
		document.getElementById("scramble").innerHTML = "";
		document.getElementById("algdisp").innerHTML = "";

	});

	listener.simple_combo("space", function() {displayAlgorithm();});
	listener.simple_combo("enter", function() {
		testRandomFromList(createAlgList());
	});

})();
