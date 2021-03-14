class KeyCombo {
    constructor(code, modifiers={}) {
        this.shift = modifiers.shift || false;
        this.ctrl = modifiers.ctrl || false;
        this.alt = modifiers.alt || false;

        this.code = code;
    }

    matches(evt) {
        return this.code == evt.code && evt.shiftKey == this.shift && evt.altKey == this.alt && evt.ctrlKey == this.ctrl;
    }

    toString() {
        let out = this.code.replace("Key", "");
        if (this.shift) {
            out = "shift-" + out;
        }
        if (this.alt) {
            out = "alt-" + out;
        }
        if (this.ctrl) {
            out = "ctrl-" + out;
        }
        return out;
    }
}

function keyEventToKeyCombo(evt, force) {
    let code = evt.code;
    if (evt.key === "Shift" || evt.key === "Control" || evt.key === "Meta" || evt.key == "Alt") {
        if (force) {
            code = "";
        } else {
            return false;
        }
    }
    return new KeyCombo(code, {"shift": evt.shiftKey, "alt": evt.altKey, "ctrl": evt.ctrlKey});
}

class Listener {
    constructor() {
        let self = this;
        this.combos = []; // [[combo, fn]]
        document.body.addEventListener("keydown", e => self.keydown(e));
    }

    keydown(e) {
        if (e.target !== document.body) { return; }
        for (let [combo, fn] of this.combos) {
            if (combo.matches(e)) {
                fn(e);
                e.preventDefault();
                return true;
            }
        }
        return false;
    }

    register(combo, action) {
        this.combos.push([combo, action]);
    }

    reset() {
        this.combos = [];
    }
}
