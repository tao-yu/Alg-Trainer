var alg = require("alg");

//          ┌──┬──┬──┐
//          │ 0│ 1│ 2│
//          ├──┼──┼──┤
//          │ 3│ 4│ 5│
//          ├──┼──┼──┤
//          │ 6│ 7│ 8│
// ┌──┬──┬──┼──┼──┼──┼──┬──┬──┐
// │ 9│10│11│12│13│14│15│16│17│
// ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
// │18│19│20│21│22│23│24│25│26│
// ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
// │27│28│29│30│31│32│33│34│35│
// └──┴──┴──┼──┼──┼──┼──┴──┴──┘
//          │36│37│38│
//          ├──┼──┼──┤
//          │39│40│41│
//          ├──┼──┼──┤
//          │42│43│44│
//          ├──┼──┼──┤
//          │45│46│47│
//          ├──┼──┼──┤
//          │48│49│50│
//          ├──┼──┼──┤
//          │51│52│53│
//          └──┴──┴──┘

var movesInAlg = function(sequence) {
  return alg.cube.expand(sequence).match(/[UDRLFBudlrfbxyzMES]w?[2']?/g) || [];
};

var stickerCount = 54;
var solved = function() {
  var r = [];
  for (var i = 0; i < stickerCount; i++) {
    r.push(i);
  }
  return r;
};

var moveDefs = [
  ["U", [       6,  3,  0,
                7,  4,  1,
                8,  5,  2,
   12, 13, 14, 15, 16, 17, 53, 52, 51,
   18, 19, 20, 21, 22, 23, 24, 25, 26,
   27, 28, 29, 30, 31, 32, 33, 34, 35,
               36, 37, 38,
               39, 40, 41,
               42, 43, 44,
               45, 46, 47,
               48, 49, 50,
               11, 10,  9]],
  ["x", [      12, 13, 14,
               21, 22, 23,
               30, 31, 32,
   11, 20, 29, 36, 37, 38, 33, 24, 15,
   10, 19, 28, 39, 40, 41, 34, 25, 16,
    9, 18, 27, 42, 43, 44, 35, 26, 17,
               45, 46, 47,
               48, 49, 50,
               51, 52, 53,
                0,  1,  2,
                3,  4,  5,
                6,  7,  8]],
  ["y", [       6,  3,  0,
                7,  4,  1,
                8,  5,  2,
   12, 13, 14, 15, 16, 17, 53, 52, 51,
   21, 22, 23, 24, 25, 26, 50, 49, 48,
   30, 31, 32, 33, 34, 35, 47, 46, 45,
               38, 41, 44,
               37, 40, 43,
               36, 39, 42,
               29, 28, 27,
               20, 19, 18, 
               11, 10,  9]],
  ["z" , "x y x'"],
  ["D" , "x2 U x2"],
  ["R" , "z D z'"],
  ["L" , "y2 R y2"],
  ["F" , "y' R y"],
  ["B" , "y2 F y2"],
  ["M" , "L' R x'"],
  ["E" , "z M z'"],
  ["S" , "y M y'"],
  ["Rw", "M' R"],
  ["Lw", "M L"],
  ["Uw", "D y"],
  ["Dw", "y' U"],
  ["Fw", "z B'"],
  ["Bw", "z' F"],
  ["r" , "Rw"],
  ["l" , "Lw"],
  ["u" , "Uw"],
  ["d" , "Dw"],
  ["f" , "Fw"],
  ["b" , "Bw"]
];

var applyMove = function(cube, move) {
  if (!moveEffects.hasOwnProperty(move)) {
    throw new Error("Unknown move '" + move + "'");
  }
  return moveEffects[move].map(function(i) { return cube[i] });
};

var moveEffects = {};

moveDefs.forEach(function(def) {
  var move = def[0];
  var definition = def[1];
  // Moves are defined either as a permutation (undesirable but necessary)
  // or as another algorithm (preferred).
  if (typeof definition === "object") {
    moveEffects[move] = definition;
  } else {
    var moves = movesInAlg(definition);
    moveEffects[move] = moves.reduce(applyMove, solved());
  }
  var cube = applyMove(solved(), move);
  moveEffects[move] = cube;

  cube = applyMove(cube, move);
  moveEffects[move + "2"] = cube;

  cube = applyMove(cube, move);
  moveEffects[move + "'"] = cube;
});

var Cubid = function() {
  var init;
  var alg = arguments[0];
  if (arguments.length === 1) {
    init = solved();
  } else if (arguments.length === 2) {
    init = arguments[1];
  } else {
    throw new Error("new Cubid(...) takes 1 or 2 arguments.");
  }

  var moves = movesInAlg(alg);
  this.contents = moves.reduce(applyMove, init);
};

var sides = [
  [ 0,  1,  2,  3,  4,  5,  6,  7,  8],
  [ 9, 10, 11, 18, 19, 20, 27, 28, 29],
  [12, 13, 14, 21, 22, 23, 30, 31, 32],
  [15, 16, 17, 24, 25, 26, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53]
];

var colours = {};
sides.forEach(function(side, i) {
  side.forEach(function(sticker) {
    colours[sticker] = i;
  });
});

var ignoredStickersForStage = {
  'all': [],
  'f2l': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 51, 52, 53]
};

var CENTER_STICKER = 4;

Cubid.prototype.isSolved = function(stage) {
  if (stage === undefined) {
    stage = 'all';
  } else {
    stage = stage.toLowerCase();
  }

  var ignoredStickers = ignoredStickersForStage[stage];
  for (var i = 0; i < sides.length; i++) {
    var col = colours[this.contents[sides[i][CENTER_STICKER]]];
    for (var j = 0; j < sides[i].length; j++) {
      if (col !== colours[this.contents[sides[i][j]]] && ignoredStickers.indexOf(this.contents[sides[i][j]]) === -1) {
        return false;
      }
    }
  };
  return true;
};

Cubid.prototype.apply = function(alg) {
  return new Cubid(alg, this.contents);
};

module.exports = Cubid;
