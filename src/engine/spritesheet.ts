import * as Utils from './util'
import { Logger } from './logger'

export class SpriteSheet {
    private static _instance: SpriteSheet = null;

    public frames: { [index: string]: Utils.cRectangle } = {};
    public _image: HTMLImageElement;

    private _imageUrl: string = "";
    private _jsonUrl: string = "";

    private _logger: Logger = Logger.getInstance();

    constructor(url: string) {
        if (SpriteSheet._instance) {
            throw new Error('SpriteSheet is a singleton');
        }

        this._imageUrl = url;
        this._jsonUrl = url.replace(".png", "") + ".json";

        SpriteSheet._instance = this;
        return SpriteSheet._instance;
    }


    public static getInstance(): SpriteSheet {
        if (SpriteSheet._instance == null) {

            SpriteSheet._instance = new SpriteSheet('');
        }
        return SpriteSheet._instance;
    }

    public async load() {
        try {
            this._logger.debug('start loading spritesheet json..');
            var json = await Utils.getXMLRequest(this._jsonUrl);

            this._onRead(JSON.parse(json));

            this._logger.debug('start loading spritesheet png..');
            this._image = await this._loadImage(this._imageUrl);

            this._logger.debug('loaded spritesheet..');
        }
        catch (err) {
            this._logger.debug('error loading spritesheet..' + err.message);
        }

    }

    private _loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                resolve(img);
            }
            img.onerror = function() {
                reject(null);
            }
            img.src = url;
        });
    }

    private _onRead(data: any) {
        var temp_frame: Utils.cRectangle;

        for (var frame_name in data.frames) {
            var sprite_data: any = data.frames[frame_name];

            temp_frame = new Utils.cRectangle(sprite_data.frame.x,
                sprite_data.frame.y,
                sprite_data.frame.w,
                sprite_data.frame.h);

            this.frames[frame_name] = temp_frame;
        }
    }
}