var defaultKeymaps = [
    [new KeyCombo("KeyI"), "R"],
    [new KeyCombo("KeyK") , "R'"],
    [new KeyCombo("KeyJ") , "U"],
    [new KeyCombo("KeyF") , "U'"],
    [new KeyCombo("KeyH") , "F"],
    [new KeyCombo("KeyG") , "F'"],
    [new KeyCombo("KeyW") , "B"],
    [new KeyCombo("KeyO") , "B'"],
    [new KeyCombo("KeyD") , "L"],
    [new KeyCombo("KeyE") , "L'"],
    [new KeyCombo("KeyS") , "D"],
    [new KeyCombo("KeyL") , "D'"],
    [new KeyCombo("KeyU") , "r"],
    [new KeyCombo("KeyM") , "r'"],
    [new KeyCombo("KeyV") , "l"],
    [new KeyCombo("KeyR") , "l'"],
    [new KeyCombo("Quote") , "M"],
    [new KeyCombo("Backslash") , "M"],
    [new KeyCombo("BracketLeft") , "M'"],
    [new KeyCombo("KeyT") , "x"],
    [new KeyCombo("KeyN") , "x'"],
    [new KeyCombo("Semicolon") , "y"],
    [new KeyCombo("KeyP") , "z"],
    [new KeyCombo("KeyQ") , "z'"],
    [new KeyCombo("KeyA") , "y'"],
    [new KeyCombo("KeyH", {"shift": true}), "S"],
    [new KeyCombo("KeyG", {"shift": true}), "S'"],
    [new KeyCombo("KeyX"), "E"],
    [new KeyCombo("Period"), "E'"]];

function getKeyMaps() {
    if (localStorage.getItem("keymaps") === null) {
        localStorage.setItem("keymaps", JSON.stringify(defaultKeymaps));
    }
    let km = JSON.parse(localStorage.getItem("keymaps"));
    // turn all objects into KeyCombo objects
    for (var i = 0; i < km.length; i++) {
        let kc = new KeyCombo(""); // ghost object
        Object.assign(kc, km[i][0]);
        km[i][0] = kc;
    }
    return km;
}
