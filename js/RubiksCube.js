var currentRotation = "";
var cube = new RubiksCube();
var currentAlgorithm = "";//After an alg gets tested for the first time, it becomes the currentAlgorithm.
var currentScramble = "";
var algArr;//This is the array of alternatives to currentAlgorithm
var canvas = document.getElementById("cube");
var ctx = canvas.getContext("2d");
var stickerSize = canvas.width/5;
var currentAlgIndex = 0;
var algorithmHistory = [];

createAlgsetPicker();

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
Cube.initSolver();

document.getElementById("loader").style.display = "none";
var myVar = setTimeout(showPage, 1);
function showPage(){
    document.getElementById("page").style.display = "block";
}

var defaults = {"useVirtual":false,
                "hideTimer":false,
                "showScramble":true,
                "realScrambles":true,
                "randAUF":true,
                "prescramble":true,
                "goInOrder":false,
                "goToNextCase":false,
                "mirrorAllAlgs":false,
                "colourneutrality1":"",
                "colourneutrality2":"x2",
                "colourneutrality3":"y",
                "userDefined":false,
                "userDefinedAlgs":"",
                "fullCN":false,
                "cubeType":"3x3",
                "algsetpicker":document.getElementById("algsetpicker").options[0].value,
                "useCustomColourScheme":false,
                "customColourU":"white",
                "customColourD":"yellow",
                "customColourF":"green",
                "customColourB":"blue",
                "customColourR":"red",
                "customColourL":"orange"
                };

for (var setting in defaults){
    if (typeof(defaults[setting]) === "boolean"){
        var previousSetting = localStorage.getItem(setting);
            if (previousSetting == null){
                document.getElementById(setting).checked = defaults[setting];
            }
            else {
                document.getElementById(setting).checked = previousSetting == "true"? true : false;
            }
    }
    else {
        var previousSetting = localStorage.getItem(setting);
            if (previousSetting == null){
                document.getElementById(setting).value = defaults[setting];
            }
            else {
                document.getElementById(setting).value = previousSetting;
            }
    }
}

setTimerDisplay(!document.getElementById("hideTimer").checked);
if (document.getElementById("userDefined").checked){
    document.getElementById("userDefinedAlgs").style.display = "block";
}

var useCustomColourScheme = document.getElementById("useCustomColourScheme");
useCustomColourScheme.addEventListener("click", function(){
    localStorage.setItem("useCustomColourScheme", this.checked);
});

var customColourU = document.getElementById("customColourU");
customColourU.addEventListener("input", function(){
    localStorage.setItem("customColourU", this.value);
});

var customColourD = document.getElementById("customColourD");
customColourD.addEventListener("input", function(){
    localStorage.setItem("customColourD", this.value);
});

var customColourF = document.getElementById("customColourF");
customColourF.addEventListener("input", function(){
    localStorage.setItem("customColourF", this.value);
});

var customColourB = document.getElementById("customColourB");
customColourB.addEventListener("input", function(){
    localStorage.setItem("customColourB", this.value);
});

var customColourR = document.getElementById("customColourR");
customColourR.addEventListener("input", function(){
    localStorage.setItem("customColourR", this.value);
});

var customColourL = document.getElementById("customColourL");
customColourL.addEventListener("input", function(){
    localStorage.setItem("customColourL", this.value);
});

var resetCustomColourScheme = document.getElementById("resetCustomColourScheme");
resetCustomColourScheme.addEventListener("click", function(){
    if (confirm("Reset custom colour scheme?")){
        for (var setting in defaults){
            if (setting.indexOf( "customColour" ) > -1){
                document.getElementById(setting).value = defaults[setting];
                localStorage.setItem(setting, defaults[setting]);
            }
        }
    }
});

setVirtualCube(document.getElementById("useVirtual").checked);
createCheckboxes();
drawCube(cube.cubestate);
updateVisualCube("");

var useVirtual = document.getElementById("useVirtual");
useVirtual.addEventListener("click", function(){
    setVirtualCube(this.checked);
    localStorage.setItem("useVirtual", this.checked);
    stopTimer(false);
    document.getElementById("timer").innerHTML = "0.00";
});

var hideTimer = document.getElementById("hideTimer");
hideTimer.addEventListener("click", function(){
    setTimerDisplay(!this.checked);
    localStorage.setItem("hideTimer", this.checked);
    stopTimer(false);
    document.getElementById("timer").innerHTML = "0.00";

});

var showScramble = document.getElementById("showScramble");
showScramble.addEventListener("click", function(){
    localStorage.setItem("showScramble", this.checked);
});

var realScrambles = document.getElementById("realScrambles");
realScrambles.addEventListener("click", function(){
    localStorage.setItem("realScrambles", this.checked);
});

var randAUF = document.getElementById("randAUF");
randAUF.addEventListener("click", function(){
    localStorage.setItem("randAUF", this.checked);
});

var prescramble = document.getElementById("prescramble");
prescramble.addEventListener("click", function(){
    localStorage.setItem("prescramble", this.checked);
});

var goInOrder = document.getElementById("goInOrder");
goInOrder.addEventListener("click", function(){
    localStorage.setItem("goInOrder", this.checked);
    currentAlgIndex=0;
});

var goToNextCase = document.getElementById("goToNextCase");
goToNextCase.addEventListener("click", function(){
    if (isUsingVirtualCube()){
        alert("Note: This option has no effect when using the virtual cube.")
    }
    localStorage.setItem("goToNextCase", this.checked);
});

var mirrorAllAlgs = document.getElementById("mirrorAllAlgs");
mirrorAllAlgs.addEventListener("click", function(){
    localStorage.setItem("mirrorAllAlgs", this.checked);
});

var userDefined = document.getElementById("userDefined");
userDefined.addEventListener("click", function(){
    document.getElementById("userDefinedAlgs").style.display = this.checked? "block":"none";
    localStorage.setItem("userDefined", this.checked);
});

var fullCN = document.getElementById("fullCN");
fullCN.addEventListener("click", function(){
    localStorage.setItem("fullCN", this.checked);
});

var cubeType = document.getElementById("cubeType");
cubeType.addEventListener("change", function(){
    localStorage.setItem("cubeType", this.value);
    drawCube(cube.cubestate);
    updateVisualCube("");
});

var algsetpicker = document.getElementById("algsetpicker");
algsetpicker.addEventListener("change", function(){
    createCheckboxes();
    localStorage.setItem("algsetpicker", this.value);
});

var clearTimes = document.getElementById("clearTimes");
clearTimes.addEventListener("click", function(){

    if (confirm("Clear all times?")){
        timeArray = [];
        updateTimeList();
        updateStats();
    }

});

var deleteLast = document.getElementById("deleteLast");
deleteLast.addEventListener("click", function(){
    timeArray.pop();
    algorithmHistory.pop();
    updateTimeList();
    updateStats();
});

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
            if (useCustomColourScheme.checked){
                colour = customColourU.value;
            } else {
                colour = defaults["customColourU"];
            }
            break;
        case 2:
            if (useCustomColourScheme.checked){
                colour = customColourR.value;
            } else {
                colour = defaults["customColourR"];
            }
            break;
        case 3:
            if (useCustomColourScheme.checked){
                colour = customColourF.value;
            } else {
                colour = defaults["customColourF"];
            }
            break;
        case 4:
            if (useCustomColourScheme.checked){
                colour = customColourD.value;
            } else {
                colour = defaults["customColourD"];
            }
            break;
        case 5:
            if (useCustomColourScheme.checked){
                colour = customColourL.value;
            } else {
                colour = defaults["customColourL"];
            }
            break;
        case 6:
            if (useCustomColourScheme.checked){
                colour = customColourB.value;
            } else {
                colour = defaults["customColourB"];
            }
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

    if (timerIsRunning && cube.isSolved() && isUsingVirtualCube()){
        stopTimer();
    }
}


function getRandAuf(letter){
    var rand = Math.floor(Math.random()*4);//pick 0,1,2 or 3
    var aufs = [letter + " ", letter +"' ",letter + "2 ", ""];
    return aufs[rand];
}
//This will return an algorithm that has the same effect as algorithm, but with different moves.

//This requires https://github.com/ldez/cubejs to work. The Cube.initSolver(); part takes a long time, so I removed it for the time being. 

function obfusticate(algorithm){

    //Cube.initSolver();
    var rc = new RubiksCube();
    rc.doAlgorithm(algorithm);
    orient = alg.cube.invert(rc.wcaOrient());
    return (alg.cube.invert(rc.solution()) + " " + orient).replace(/2'/g, "2");
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

function generateAlgScramble(raw_alg,set,obfusticateAlg,shouldPrescramble){

    if (!obfusticateAlg){
        return alg.cube.invert(raw_alg);
    } else if (!shouldPrescramble){//if realscrambles not checked but should not prescramble, just obfusticate the inverse
        return obfusticate(alg.cube.invert(raw_alg));
    }

    switch(set){
        case "ZBLS (Chad Batten, Tao Yu)":
        case "VHLS (Chad Batten)":
            return generatePreScramble(raw_alg, "RBR'FRB'R'F',RUR'URU2R',U,R'U'RU'R'U2R,F2U'R'LF2L'RU'F2", 1000, true);//ZBLLscramble

        case "OLL":
        case "OLL (Feliks Zemdegs - Cubeskills)":
        case "VLS":
        case "WVLS":
        case "OH OLL":
        case "CLS (Justin Taylor)":
        case "VLS (Jayden McNeill)":
            return generatePreScramble(raw_alg, "R'FR'B2'RF'R'B2'R2,F2U'R'LF2RL'U'F2,U", 100, true);//PLL scramble

        case "ELS (FR) (Justin Taylor)":
            return generatePreScramble(raw_alg, "R'FR'B2'RF'R'B2'R2,F2U'R'LF2RL'U'F2,U,R' D' R U R' D R,R F' L F R' F' L' F,R2 U R2' U R2 U2' R2',R U' R' U R U2' R' U R U' R'", 100, true);//CLS FR scramble
        case "ELS (BR) (Justin Taylor)":
            return generatePreScramble(raw_alg, "R'FR'B2'RF'R'B2'R2,F2U'R'LF2RL'U'F2,U,R2' U' R2 U' R2 U2' R2,R' U2 R U' R' U' R,R' U R U2' R' U R,R' U R U' R' U2' R U' R' U R", 100, true);//CLS FR scramble

        case "OLLCP":
        case "OLLCP (Cale Schoon)":
        case "OLLCP (Justin Taylor, WIP)":
        case "COLL":
        case "COLL (Tao Yu)":
        case "CP solved OLLCP":
        case "Briggs-Taylor Reduction COLL":
            return generatePreScramble(raw_alg, "F2U'R'LF2RL'U'F2,U", 5000, true);//EPLL scramble

        case "CMLL":
            return generatePreScramble(raw_alg, "U,M", 100, true);//LSE scramble

        case "3x3 CLL (Justin Taylor)":
            return generatePreScramble(raw_alg, "F2 U' R' L F2 L' R U' F2, R' U2' R2 U R' U' R' U2' r U R U' r', U", 100, true);//ELL scramble

        case "42 (Shadowslice)":
            return generatePreScramble(raw_alg, "M'UM, M'U'M, MUM', MU'M',M2, RUMU'R'M", 500, true);//L7E scramble

        case "OL5C (SqAree)":
            return generatePreScramble(raw_alg, "R2,U,D", 100, true);//<U, D, R2> scramble

        case "TOLS (Justin Taylor)":
        case "TSLE":
            return generatePreScramble(raw_alg, "R2 U2' R2' U' R2 U' R2,R'FR'B2'RF'R'B2'R2,F2U'R'LF2RL'U'F2,U", 100, true); //TTLL scramble

        case "F2L":
            return generatePreScramble(raw_alg, "FRUR'U'F',RBR'FRB'R'F',RUR'URU2R',U", 100, true);

        case "Ortega OLL":
            return generatePreScramble(raw_alg, "R F' R B2 R' F R B2 R2,R'FR'B2'RF'R'B2'R2,U,D", 100, true);
        case "CPLS (Arc)":
        case "CPEOLL":
            return generatePreScramble(raw_alg, "R U R' U R U2' R', U, L' U' L U' L' U2 L", 100, true);//2GLL scramble

        case "Pseudo2GLL (no algs)":
            return generatePreScramble(raw_alg, "R U R' U R U2' R', U, L' U' L U' L' U2 L, F R' F' M F R F' M'", 10000, true);
        case "Ribbon Multislotting":
            return generatePreScramble(raw_alg, "R2 U2' R2' U' R2 U' R2,R'FR'B2'RF'R'B2'R2,F2U'R'LF2RL'U'F2,U,R U' R' U2 R U' R' ,R U2' R' U R U R' ,R U R' U R U2' R' ,R U2 R' U' R U' R' ", 10000, true);
        default:  
            return obfusticate(alg.cube.invert(raw_alg));
    }

}



function generatePreScramble(raw_alg, generator, times, obfusticateAlg){

    var genArray = generator.split(",");

    var scramble = "";
    var i = 0;

    for (; i<times; i++){
        var rand = Math.floor(Math.random()*genArray.length);
        scramble += genArray[rand];
    }
    scramble += alg.cube.invert(raw_alg);

    if (obfusticateAlg){
        return obfusticate(scramble);
    }
    else {
        return scramble;
    }

}
function generateOrientation(){

    if (document.getElementById("fullCN").checked){
        return getRandAuf("x")+getRandAuf("y")+getRandAuf("z");
    }

    var cn1 = document.getElementById("colourneutrality1").value;
    var cn2 = document.getElementById("colourneutrality2").value;
    var cn3 = document.getElementById("colourneutrality3").value;

    //todo: warn if user enters invalid strings

    localStorage.setItem("colourneutrality1", cn1);
    localStorage.setItem("colourneutrality2", cn2);
    localStorage.setItem("colourneutrality3", cn3);

    var rand1 = Math.floor(Math.random()*4);
    var rand2 = Math.floor(Math.random()*4);

    //console.log(cn1 + cn2.repeat(rand1) + cn3.repeat(rand2));
    return cn1 + cn2.repeat(rand1) + cn3.repeat(rand2);
}

class AlgTest {
    constructor(rawAlgs, scramble, solutions, preorientation, solveTime, time, set, visualCubeView, cubeType) {
        this.rawAlgs = rawAlgs;
        this.scramble = scramble;
        this.solutions = solutions;
        this.preorientation = preorientation;
        this.solveTime = solveTime;
        this.time = time;
        this.set = set;
        this.visualCubeView = visualCubeView;
        this.cubeType = cubeType;
    }
}

function generateAlgTest(){

    var set = document.getElementById("algsetpicker").value;
    var obfusticateAlg = document.getElementById("realScrambles").checked;
    var shouldPrescramble = document.getElementById("prescramble").checked;
    var randAUF = document.getElementById("randAUF").checked;

    var rawAlgStr = randomFromList(createAlgList());
    var rawAlgs = rawAlgStr.split("/");
    rawAlgs = fixAlgorithms(rawAlgs);
    if (mirrorAllAlgs.checked){
        rawAlgs = mirrorAlgsAcrossM(rawAlgs);
    }
    var solutions;
    if (randAUF){
        solutions = addAUFs(rawAlgs);
    } else {
        solutions = rawAlgs;
    }

    var scramble = generateAlgScramble(solutions[0],set,obfusticateAlg,shouldPrescramble);

    var preorientation = generateOrientation();

    var cubeType = document.getElementById("cubeType");

    var solveTime = null;
    var time = Date.now();
    var visualCubeView = "plan";

    var algTest = new AlgTest(rawAlgs, scramble, solutions, preorientation, solveTime, time, set, visualCubeView, cubeType);
    return algTest;
}
function testAlg(algTest, addToHistory=true){

    var scramble = document.getElementById("scramble");

    if (document.getElementById("showScramble").checked){
        scramble.innerHTML = algTest.scramble;
    } else{
        scramble.innerHTML = "&nbsp;";
    }

    document.getElementById("algdisp").innerHTML = "";

    cube.resetCube();
    doAlg(algTest.preorientation);
    doAlg(algTest.scramble);
    drawCube(cube.cubestate)

    updateVisualCube(algTest.preorientation + algTest.scramble);

    if (addToHistory){
        algorithmHistory.push(algTest);
    }
    console.log(algTest);

}

function reTestAlg(){

    var lastTest = algorithmHistory[algorithmHistory.length-1];
    if (lastTest==undefined){
        return;
    }
    cube.resetCube();
    doAlg(lastTest.preorientation);
    doAlg(lastTest.scramble);
    drawCube(cube.cubestate);

}

function updateTrainer(scramble, solutions, algorithm, timer){
    if (scramble!=null){
        document.getElementById("scramble").innerHTML = scramble;
    }
    if (solutions!=null){
        document.getElementById("algdisp").innerHTML = solutions;
    }

    if (algorithm!=null){
        cube.resetCube();
        doAlg(algorithm);
        updateVisualCube(algorithm);
    }

    if (timer!=null){
        document.getElementById("timer").innerHTML = timer;
    }
}
function fixAlgorithms(algorithms){
    //for now this just removes brackets
    var i = 0;
    for (;i<algorithms.length;i++){
        algorithms[i] = alg.cube.simplify(algorithms[i].replace(/\[|\]|\)|\(/g, ""));
    }
    return algorithms;
    //TODO Allow commutators

}

function validTextColour(stringToTest) {
    if (stringToTest === "") { return false; }
    if (stringToTest === "inherit") { return false; }
    if (stringToTest === "transparent") { return false; }
    
    var visualCubeColoursArray = ['black', 'dgrey', 'grey', 'silver', 'white', 'yellow', 
                                  'red', 'orange', 'blue', 'green', 'purple', 'pink'];
    
    if (stringToTest[0] !== '#') {
        return visualCubeColoursArray.indexOf(stringToTest) > -1;
    } else {
        return /^#[0-9A-F]{6}$/i.test(stringToTest)
    }
}

function validateCustomColourScheme(){
    var invalidColours = [];
    var customColours = [customColourU, customColourD, customColourF,
                         customColourB, customColourR, customColourL];
    
    for (var i = 0; i < customColours.length; i++) {
        if (!validTextColour(customColours[i].value)) {
            invalidColours.push(customColours[i].value);
        }
    }
    
    if (invalidColours.length > 0) {
        alert("The following custom colours are not supported and will cause unexpected behaviour:\n" + invalidColours.join(", ") + "\n\n" +
               "Either use #RRGGBB, or one of the following colour names:\n" +
               "black, dgrey, grey, silver, white, yellow, red, orange, blue, green, purple, pink."
            );
    }
}

function stripLeadingHashtag(colour){
    if (colour[0] == '#'){
        return colour.substring(1);
    }

    return colour;
}

function updateVisualCube(algorithm){
    
    switch (document.getElementById("cubeType").value){
        case "2x2":
            var pzl = "2";
            break;
        case "3x3":
            var pzl = "3";
            break;
    }
    
    var imgsrc = "http://www.cubing.net/api/visualcube/?fmt=svg&size=300&view=plan&bg=black&pzl=" + pzl + "&alg=x2" + algorithm;

    if (useCustomColourScheme.checked){
        validateCustomColourScheme();
        
        imgsrc += "&sch=" + stripLeadingHashtag(customColourD.value) + "," + 
                            stripLeadingHashtag(customColourR.value) + "," +
                            stripLeadingHashtag(customColourB.value) + "," +
                            stripLeadingHashtag(customColourU.value) + "," +
                            stripLeadingHashtag(customColourL.value) + "," + 
                            stripLeadingHashtag(customColourF.value);
    }
    
    document.getElementById("visualcube").src = imgsrc;
}

function displayAlgorithm(algTest, reTest=true){    

    //If reTest is true, the scramble will also be setup on the virtual cube
    if (reTest){
        reTestAlg();
    }

    updateTrainer(algTest.scramble, algTest.solutions.join("<br><br>"), null, null);

    scramble.style.color = '#e6e6e6';
}

function displayAlgorithmFromHistory(index){    

    var algTest = algorithmHistory[index];

    console.log( algTest );

    var timerText;
    if (algTest.solveTime == null){
        timerText = 'n/a'
    } else {
        timerText = algTest.solveTime.toString()
    }

    updateTrainer(algTest.scramble, algTest.solutions.join("<br><br>"), algTest.scramble, timerText);

    scramble.style.color = '#e6e6e6';
}

function displayAlgorithmForPreviousTest(reTest=true){//not a great name

    var lastTest = algorithmHistory[algorithmHistory.length-1];
    if (lastTest==undefined){
        return;
    }
    //If reTest is true, the scramble will also be setup on the virtual cube
    if (reTest){
        reTestAlg();
    }

    updateTrainer(lastTest.scramble, lastTest.solutions.join("<br><br>"), null, null);

    scramble.style.color = '#e6e6e6';
}

function randomFromList(set){

    if (document.getElementById("goInOrder").checked){
        return set[currentAlgIndex++%set.length];
    }   

    size = set.length;
    rand = Math.floor(Math.random()*size);

    return set[rand];

}
var starttime;
var timerUpdateInterval;
var timerIsRunning = false;
function startTimer(){

    if (timerIsRunning){
        return;
    }

    if (document.getElementById("timer").style.display == 'none'){
        //don't do anything if timer is hidden
        return;
    }
    starttime = Date.now();
    timerUpdateInterval = setInterval(updateTimer, 1);
    timerIsRunning = true;
}

function stopTimer(logTime=true){

    if (!timerIsRunning){
        return;
    }

    if (document.getElementById("timer").style.display == 'none'){
        //don't do anything if timer is hidden
        return;
    }


    clearInterval(timerUpdateInterval);
    timerIsRunning = false;

    var time = parseFloat(document.getElementById("timer").innerHTML);
    if (isNaN(time)){
        return NaN;
    }


    if (logTime){
        var lastTest = algorithmHistory[algorithmHistory.length-1];
        var solveTime = new SolveTime(time,'');
        lastTest.solveTime = solveTime;
        timeArray.push(solveTime);
        console.log(timeArray);
        updateTimeList();
    }

    updateStats();
    return time;
}

function updateTimer(){
    document.getElementById("timer").innerHTML = ((Date.now()-starttime)/1000).toFixed(2);
}
var timeArray = [];

function getMean(timeArray){
    var i;
    var total = 0;
    for(i=0;i<timeArray.length;i++){
        total += timeArray[i].timeValue();
    }

    return total/timeArray.length;
}

function updateStats(){
    var statistics = document.getElementById("statistics");

    statistics.innerHTML = "&nbsp";

    if (timeArray.length!=0){
        statistics.innerHTML += "Mean of " + timeArray.length + ": " + getMean(timeArray).toFixed(2) + "<br>";
    }

}



function updateTimeList(){
    var i;
    var timeList = document.getElementById("timeList");
    timeList.innerHTML = "&nbsp";
    for (i=0; i<timeArray.length;i++){
        timeList.innerHTML += timeArray[i].toString();
        timeList.innerHTML += " ";
    }
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
    //algsetPicker.size = Object.keys(window.algs).length
}



function createCheckboxes(){

    var set = document.getElementById("algsetpicker").value;


    var full_set = window.algs[set];
    
    if (!full_set){
        set = document.getElementById("algsetpicker").options[0].value;
        document.getElementById("algsetpicker").value = set;
        full_set = window.algs[set]
    }
    var subsets = Object.keys(full_set);

    var myDiv = document.getElementById("cboxes");

    myDiv.innerHTML = "";

    for (var i = 0; i < subsets.length; i++) {
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.value = subsets[i];
        checkBox.onclick = function(){currentAlgIndex = 0;}
        checkBox.setAttribute("id", set.toLowerCase() +  subsets[i]);

        myDiv.appendChild(checkBox);
        myDiv.appendChild(label);
        label.appendChild(document.createTextNode(subsets[i]));
    }
}

function clearSelectedAlgsets(){
    var elements = document.getElementById("algsetpicker").options;
    for(var i = 0; i < elements.length; i++){
        elements[i].selected = false;
    }
}

function findMistakesInUserAlgs(userAlgs){
    var errorMessage = "";
    var newList = [];
    for (var i = 0; i < userAlgs.length; i++){
        try {
            alg.cube.simplify(userAlgs[i]);
            if (userAlgs[i].trim()!=""){
                newList.push(userAlgs[i]);
            }
        }
        catch(err){
            errorMessage += "\"" + userAlgs[i] + "\"" + " is an invalid alg and has been removed\n";
        }
    }

    if (errorMessage!=""){
        alert(errorMessage);
    }

    document.getElementById("userDefinedAlgs").value = newList.join("\n");
    localStorage.setItem("userDefinedAlgs", newList.join("\n"));
    return newList;
}

function createAlgList(){

    if (document.getElementById("userDefined").checked){
        algList = findMistakesInUserAlgs(document.getElementById("userDefinedAlgs").value.split("\n"));
        if (algList.length==0){
            alert("No algs found");
        }
        return algList;
    }
    var algList = [];

    var set = document.getElementById("algsetpicker").value;

    if (set == ""){
        return ["R U R' U' R' F R2 U' R' U' R U R' F'"];
    }

    for (var subset in window.algs[set]){

        if(document.getElementById(set.toLowerCase() + subset).checked){
            algList = algList.concat(window.algs[set][subset]);
        }
    }

    if(algList.length < 1){ //if nothing checked, test on the whole subset
        for (var subset in window.algs[set]){
            algList = algList.concat(window.algs[set][subset]);
        }
        console.log(algList.length + " algs in list");
        return algList;
    }
    console.log(algList.length + " algs in list");

    return algList;
}

function mirrorAlgsAcrossM(algList){
    algList = fixAlgorithms(algList);
    return algList.map(x => alg.cube.mirrorAcrossM(x));
}

function averageMovecount(metric){
    var algList = createAlgList();

    var totalmoves = 0;
    var i = 0;
    for (; i<algList.length; i++){
        var topAlg = algList[i].split("/")[0];
        topAlg = alg.cube.simplify(topAlg.replace(/\[|\]|\)|\(/g, ""))

        var moves = alg.cube.countMoves(topAlg,  {metric: metric})
        if (topAlg.startsWith("U") || topAlg.startsWith("y")){
            moves--;
        }
        if (topAlg.endsWith("U") || topAlg.endsWith("y")|| topAlg.endsWith("U2")|| topAlg.endsWith("U'")){
            moves--;
        }
        totalmoves += moves;
    }

    return totalmoves/algList.length;
}

function toggleVirtualCube(){
    var sim = document.getElementById("simcube");

    if (sim.style.display == 'none'){
        sim.style.display = 'block';
    }
    else {
        sim.style.display = 'none';
    }
}

function setVirtualCube(setting){
    var sim = document.getElementById("simcube");
    if (setting){
        sim.style.display = 'block';
    } else {
        sim.style.display = 'none';
        document.getElementById("timer").style.display = 'block'; //timer has to be shown when simulator cube is not used
        document.getElementById("hideTimer").checked = false;
    }
}

function setTimerDisplay(setting){
    var timer = document.getElementById("timer");
    if (!isUsingVirtualCube()){
        alert("The timer can only be hidden when using the simulator cube.");
        document.getElementById("hideTimer").checked = false;
    }
    else if (setting){
        timer.style.display = 'block';
    } else {
        timer.style.display = 'none';
    }
}

function isUsingVirtualCube(){
    var sim = document.getElementById("simcube")

    if (sim.style.display == 'none'){
        return false;
    }
    else {
        return true;
    }
}


var listener = new window.keypress.Listener();
var keymaps = [

    ["i", "R"], 
    ["k" , "R'"],
    ["j" , "U"],
    ["f" , "U'"],
    ["h" , "F"],
    ["g" , "F'"],
    ["w" , "B"],
    ["o" , "B'"],
    ["d" , "L"],
    ["e" , "L'"],
    ["s" , "D"],
    ["l" , "D'"],
    ["u" , "r"],
    ["m" , "r'"],
    ["v" , "l"],
    ["r" , "l'"],
    ["`" , "M"],
    ["'" , "M"],
    ["[" , "M'"],
    ["t" , "x"],
    ["n" , "x'"],
    [";" , "y"],
    ["p" , "z"],
    ["q" , "z'"],
    ["a" , "y'"],
    ["shift h", "S F'"],
    ["shift g", "S' F"],
    ["x", "E"],
    [".", "E'"]];


keymaps.forEach(function(keymap){
    listener.register_combo({
        "keys"              : keymap[0],
        "on_keydown"        : function() {  doAlg(keymap[1]);},     
    });
});
listener.simple_combo("backspace", function() { displayAlgorithmForPreviousTest();});
listener.simple_combo("esc", function() {
    if (isUsingVirtualCube()){
        stopTimer(false);
    }
    reTestAlg();
    document.getElementById("scramble").innerHTML = "&nbsp;";
    document.getElementById("algdisp").innerHTML = "";

});



function nextScramble(displayReady=true){
    document.getElementById("scramble").style.color = "white";
    stopTimer(false);
    if (displayReady){
        document.getElementById("timer").innerHTML = 'Ready';
    };
    if (isUsingVirtualCube()){
        testAlg(generateAlgTest());
        startTimer();
    }
    else {
        testAlg(generateAlgTest());
    }
    historyIndex = algorithmHistory.length - 1;
}
listener.simple_combo("enter", function() {
    nextScramble();
    doNothingNextTimeSpaceIsPressed = false;
});
listener.simple_combo("tab", function() {
    nextScramble();
    doNothingNextTimeSpaceIsPressed = false;
});

var historyIndex;
listener.simple_combo("left", function() {
    if (algorithmHistory.length<=1 || timerIsRunning){
        return;
    }
    historyIndex--;

    if (historyIndex<0){
        alert('Reached end of solve log');
        historyIndex = 0;
    }
    displayAlgorithmFromHistory(historyIndex);
});
listener.simple_combo("right", function() { 
    if (timerIsRunning){
        return;
    }
    historyIndex++;
    if (historyIndex>=algorithmHistory.length){
        nextScramble();
        return;
    }

    displayAlgorithmFromHistory(historyIndex);
});

document.onkeyup = function(event) {
    if (event.keyCode == 32) { //space

        if (document.activeElement.type == "textarea"){
            return;
        }
        document.getElementById("timer").style.color = "white"; //Timer should never be any color other than white when space is not pressed down
        if (!isUsingVirtualCube()){
            if (document.getElementById("algdisp").innerHTML == ""){
                //Right after a new scramble is displayed, space starts the timer


                if (doNothingNextTimeSpaceIsPressed){
                    doNothingNextTimeSpaceIsPressed = false;
                }
                else {
                    startTimer(); 
                }
            }
        }
    }
};

var doNothingNextTimeSpaceIsPressed = true;
document.onkeydown = function(event) { //Stops the screen from scrolling down when you press space

    if (event.keyCode == 32) { //space
        if (document.activeElement.type == "textarea"){
            return;
        }
        event.preventDefault();
        if (!event.repeat){
            if (isUsingVirtualCube()){
                if (timerIsRunning){
                    stopTimer();
                    displayAlgorithmForPreviousTest();//put false here if you don't want the cube to retest.
                    //window.setTimeout(function (){reTestAlg();}, 250);
                }
                else {
                    displayAlgorithmForPreviousTest();
                }

            }
            else { //If not using virtual cube
                if (timerIsRunning){//If timer is running, stop timer
                    var time = stopTimer();
                    doNothingNextTimeSpaceIsPressed = true;
                    if (document.getElementById("goToNextCase").checked){
                        nextScramble(false);

                        //document.getElementById("timer").innerHTML = time;
                    } else {
                        displayAlgorithmForPreviousTest();
                    }

                }
                else if (document.getElementById("algdisp").innerHTML != ""){
                    nextScramble(); //If the solutions are currently displayed, space should test on the next alg.

                    doNothingNextTimeSpaceIsPressed = true;
                }

                else if (document.getElementById("timer").innerHTML == "Ready"){
                    document.getElementById("timer").style.color = "green";
                }
            }
        }
    }

};

class SolveTime {
    constructor(time, penalty) {
        this.time = time;
        this.penalty = penalty;
    }

    toString(decimals=2) {
        var timeString = this.time.toFixed(decimals)
        switch (this.penalty) {
            case '+2':
                return (this.time + 2).toFixed(decimals) + '+';
            case 'DNF':
                return 'DNF' + "(" + timeString + ")";
            default:
                return timeString;
        }
    }

    timeValue() {

        switch (this.penalty) {
            case '+2':
                return this.time + 2;
            case 'DNF':
                return Infinity;
            default:
                return this.time;
        }
    }

}







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

    this.isSolved = function(){
        for (var i = 0; i<6;i++){
            var colour1 = this.cubestate[9*i];
            for (var j = 0; j<8; j++){
                if (this.cubestate[9*i + j + 1]!=colour1){
                    return false;
                }
            }
        }
        return true;
    }
    this.wcaOrient = function() {
        // u-r--f--d--l--b
        // 4 13 22 31 40 49
        //
        var moves = "";

        if (this.cubestate[13]==1) {//R face
            this.doAlgorithm("z'");
            moves +="z'";
        } else if (this.cubestate[22]==1) {//on F face
            this.doAlgorithm("x");
            moves+="x";
        } else if (this.cubestate[31]==1) {//on D face
            this.doAlgorithm("x2");
            moves+="x2";
        } else if (this.cubestate[40]==1) {//on L face
            this.doAlgorithm("z");
            moves+="z";
        } else if (this.cubestate[49]==1) {//on B face
            this.doAlgorithm("x'");
            moves+="x'";
        }

        if (this.cubestate[13]==3) {//R face
            this.doAlgorithm("y");
            moves+="y";
        } else if (this.cubestate[40]==3) {//on L face
            this.doAlgorithm("y'");
            moves+="y'";
        } else if (this.cubestate[49]==3) {//on B face
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
        if (alg == "") return;

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

                console.log("Invalid alg, or no alg specified:" + alg + "|");

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
