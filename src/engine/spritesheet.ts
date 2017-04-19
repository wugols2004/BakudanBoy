import * as Utils from './util'
import { Logger } from './logger'

export class SpriteSheet {
    private static _instance: SpriteSheet = null;

    public frames: { [index: string]: Utils.cRectangle } = {};
    public _image: HTMLImageElement[] = [];

    private _imageUrls: string[] = [];
    private _jsonUrls: string[] = [];

    private _logger: Logger = Logger.getInstance();

    constructor(url: string[]) {
        if (SpriteSheet._instance) {
            throw new Error('SpriteSheet is a singleton');
        }

        this._imageUrls = url;

        var tempurl = url;

        for (let x of tempurl) {
            x = x.replace(".png", "") + ".json";
            this._jsonUrls.push(x);
        }

        SpriteSheet._instance = this;
        return SpriteSheet._instance;
    }


    public static getInstance(): SpriteSheet {
        if (SpriteSheet._instance == null) {

            SpriteSheet._instance = new SpriteSheet(['']);
        }
        return SpriteSheet._instance;
    }

    public async load() {
        try {
            this._logger.debug('start loading spritesheet json..');

            for (let jsonUrl of this._jsonUrls) {
                this._logger.debug('loading spritesheet json: ' + jsonUrl);
                let j = await Utils.getXMLRequest(jsonUrl);
                this._onRead(JSON.parse(j));
            }

            this._logger.debug('start loading spritesheet png..');

            for (let imageUrl of this._imageUrls) {
                this._logger.debug('loading spritesheet png: ' + imageUrl);
                this._image.push(await this._loadImage(imageUrl));
            }

            this._logger.debug(this._image);
            this._logger.debug('finished loading spritesheets..');
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