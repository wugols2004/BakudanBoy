import { Logger } from './logger'
import { WindowManager } from './window-manager'
import { SpriteSheet } from './spritesheet'
import { State, TitleScreen } from './states/index'

export interface IGameOptions  {
    width?: number;

    height?: number;

    canvasElementId?: string;

    spriteSheetUrl: string;

    timeScale: 1;
}

export class Game {

    public windowManager: WindowManager;

    public spritesheet: SpriteSheet;

    private _logger: Logger;

    private _lastTime: number = Date.now();

    private _timeScale: number = 1;

    private _currentState: State;

    constructor(options?: IGameOptions) {

      this._logger = Logger.getInstance();

      this._logger.debug("starting up the engine...");

      this.windowManager = new WindowManager(options);

      this.spritesheet = new SpriteSheet(options.spriteSheetUrl);

      this._timeScale = options.timeScale;
    }

    public start() {
        this._currentState = new TitleScreen();

        this.spritesheet.load().then(this._update.bind(this));

        this._logger.debug("game has started");
    }

    _update(): void {
        var elapsed = Math.floor(Date.now() - this._lastTime) || 1;
        var delta = elapsed * this._timeScale;

        this._currentState.Update(delta);

        this._currentState.Draw(delta, this.windowManager.ctx);

        requestAnimationFrame(this._update.bind(this))
    }
}