var defaultKeymaps = [
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

function getKeyMaps() {
    if (localStorage.getItem("keymaps") === null) {
        localStorage.setItem("keymaps", JSON.stringify(defaultKeymaps));
    }
    return JSON.parse(localStorage.getItem("keymaps"));
}
