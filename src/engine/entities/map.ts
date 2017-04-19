// import  { Entity } from './entity'
import * as Util from '../util'
import { SpriteSheet } from '../spritesheet'


export interface IMapTileOption {
    width: number,
    height: number,
    blockImg: string,
    groundImg: string,
    ground2Img: string,
    breakableImg: string
}

enum Block {
    BLOCK = 0,
    GROUND,
    GROUND2,
    BREAKBLOCK
}

export class MapTile {
    private static _instance: MapTile = null;

    private _defaultMapTileOption: IMapTileOption = {
        width: 21,
        height: 15,
        blockImg: 'blocks_02.png',
        groundImg: 'blocks_04.png',
        ground2Img: 'blocks_05.png',
        breakableImg: 'blocks_03.png'
    };

    private _mapOption: IMapTileOption;

    private _mapData: number[] = [];

    private _SpriteSheet: SpriteSheet;

    private _BlockSprites: string[];

    constructor(maptileoption?: IMapTileOption) {
        if (MapTile._instance) {
            throw new Error('Logger is a singleton');
        }

        this._initialize(maptileoption);

        MapTile._instance = this;
        return MapTile._instance;
    }

    public static getInstance(): MapTile {
        if (MapTile._instance == null) {

            MapTile._instance = new MapTile();
        }
        return MapTile._instance;
    }

    private _initialize(maptileoption?: IMapTileOption) {
        this._mapOption = Util.extend(this._defaultMapTileOption, maptileoption);

        this._BlockSprites = [
            this._mapOption.blockImg,
            this._mapOption.groundImg,
            this._mapOption.ground2Img,
            this._mapOption.breakableImg,
        ];

        this._mapData.length = 0;

        this._SpriteSheet = SpriteSheet.getInstance();

        this.GenerateMap(this._mapOption);
    }

    public GenerateMap(option: IMapTileOption) {
        let count = option.width * option.height;

        for (let x = 0; x < count; x++) {
            if (x < this._mapOption.width) {
                this._mapData.push(Block.BLOCK);
            }
            else if ((x % this._mapOption.width) == 0) {
                this._mapData.push(Block.BLOCK);
            }
            else if ((this._mapOption.width - (x % this._mapOption.width)) == 1) {
                this._mapData.push(Block.BLOCK);
            }
            else if (x > (this._mapOption.width * (option.height - 1))) {
                this._mapData.push(Block.BLOCK);
            }
            else {
                var block = Block.GROUND;

                if (!(Math.floor(x / this._mapOption.width) % 2) &&
                    !((x % this._mapOption.width) % 2))
                    block = Block.BLOCK;

                this._mapData.push(block);
            }

        }
    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        this._mapData.forEach((element, index) => {
            this._DrawTile(delta, ctx, element, index);
        });
    }

    private _DrawTile(delta: number, ctx: CanvasRenderingContext2D, element: number, index: number): void {
        ctx.save();

        var frame = this._SpriteSheet.frames[this._BlockSprites[element]];

        var x = (index % this._mapOption.width) * frame.w;

        var y = (index > 0) ? (Math.floor(index / this._mapOption.width) * frame.h) : 0;

        ctx.translate(x, y);

        ctx.drawImage(this._SpriteSheet._image[1],
            frame.x, frame.y,
            frame.w, frame.h,
            0, 0,
            frame.w, frame.h);
        ctx.restore();
    }

    public getTileScreenPosition(x: number, y: number): Util.Vector2 {
        var vec2 = { x: 0, y: 0 };
        var frame = this._SpriteSheet.frames[this._BlockSprites[0]];
        var index = x + (y * this._mapOption.width);

        vec2.x = (index % this._mapOption.width) * frame.w;
        vec2.y = (index > 0) ? (Math.floor(index / this._mapOption.width) * frame.h) : 0;

        return vec2;
    }
}
