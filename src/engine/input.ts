import * as Util from './util'


const enum KEYMAP {
    UP = 87, // 'w'
    DOWN = 83, // 's'
    LEFT = 65, // 'a'
    RIGHT = 68, // 'd'
    BOMB = 32, // 'space'
    ESC = 27, // 'esc'
}

export interface InputOptions {
    Up_KeyDown: () => void;
    Down_KeyDown: () => void;
    Left_KeyDown: () => void;
    Right_KeyDown: () => void;
    BOMB_KeyDown: () => void;
    ESC_KeyDown: () => void;

    Up_KeyUp: () => void;
    Down_KeyUp: () => void;
    Left_KeyUp: () => void;
    Right_KeyUp: () => void;
    BOMB_KeyUp: () => void;
    ESC_KeyUp: () => void;
}


export class InputController {
    private _InputOptions: InputOptions;

    private _keyPressed: { [key:number] : boolean };

    constructor(options: InputOptions) {
        this._InputOptions = options;

        this._keyPressed = [];

        this._keyPressed[KEYMAP.UP] = false;
        this._keyPressed[KEYMAP.DOWN] = false;
        this._keyPressed[KEYMAP.LEFT] = false;
        this._keyPressed[KEYMAP.RIGHT] = false;
        this._keyPressed[KEYMAP.BOMB] = false;
        this._keyPressed[KEYMAP.ESC] = false;

        window.addEventListener('keydown', (e)=> { this._KeyDownCallback(e)});
        window.addEventListener('keyup', (e)=> { this._KeyUpCallback(e)});
    }

    public Update() {
        if(this._keyPressed[KEYMAP.UP]) this._InputOptions.Up_KeyDown();
        if(this._keyPressed[KEYMAP.DOWN]) this._InputOptions.Down_KeyDown();
        if(this._keyPressed[KEYMAP.LEFT]) this._InputOptions.Left_KeyDown();
        if(this._keyPressed[KEYMAP.RIGHT]) this._InputOptions.Right_KeyDown();
        if(this._keyPressed[KEYMAP.BOMB]) this._InputOptions.BOMB_KeyDown();
        if(this._keyPressed[KEYMAP.ESC]) this._InputOptions.ESC_KeyDown();

    }

    private _KeyDownCallback(e: KeyboardEvent) {
        var kcode = e.which || e.keyCode;
        this._keyPressed[kcode] = true;
    }

    private _KeyUpCallback(e: KeyboardEvent) {
        var kcode = e.which || e.keyCode;
        this._keyPressed[kcode] = false;
    }

    public clearInputs () {
        this._InputOptions = null;
    }
}