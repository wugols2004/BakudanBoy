import { IGameOptions } from './game'
import { Logger } from './logger'

export class WindowManager {

    private _options: IGameOptions;
    private _logger: Logger;

    public canvas: HTMLCanvasElement;

    public ctx: CanvasRenderingContext2D;

    public canvasElementId: string;

    public canvasWidth: number;

    public canvasHeight: number;

    constructor(options?: IGameOptions) {
        this._options = options;
        this._logger = Logger.getInstance();
        this._initialize();
    }

    private _initialize() {
        this.canvasElementId = this._options.canvasElementId;

        if (this._options.canvasElementId) {
            this._logger.debug('Using Canvas element specified: ' + this._options.canvasElementId);
            this.canvas = <HTMLCanvasElement>document.getElementById(this._options.canvasElementId);
        } else {
            this._logger.debug('Using generated canvas element');
            this.canvas = <HTMLCanvasElement>document.createElement('canvas');
        }

        if (this._options.width && this._options.height) {
            this._logger.debug('Engine viewport is size ' + this._options.width + ' x ' + this._options.height);
            this.canvasWidth = this._options.width;
            this.canvasHeight = this._options.height;

            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        }

        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        if (!this.canvasElementId) {
            document.body.appendChild(this.canvas);
        }
    }


}