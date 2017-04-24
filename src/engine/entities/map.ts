// import  { Entity } from './entity'
import * as Util from '../util'
import { SpriteSheet } from '../spritesheet'
import { Logger } from '../logger'

export interface IMapTileOption {
    width: number,
    height: number,
    tileWidth: 16,
    tileHeight: 16,
    breakBlockChance: number,
    blockImg: string,
    groundImg: string,
    ground2Img: string,
    breakableImg: string
}

export enum Block {
    BLOCK = 0,
    GROUND,
    GROUND2,
    BREAKBLOCK,
    GROUNDBOMB
}

class BreakBlockAnim {
    private _BreakBlockAnim: string[] = [
        'block_break_1.png',
        'block_break_2.png',
        'block_break_3.png',
        'block_break_4.png',
        'block_break_5.png'
    ];

    private _currentTick: number = 0;
    private _animSpeed: number = 150;
    private _currentAnimIdx: number = 0;

    public onAnimEnd: () => void;

    private _SpriteSheet: SpriteSheet = SpriteSheet.getInstance();

    private tileX: number = -1;
    private tileY: number = -1;

    private screenX: number = -1;
    private screenY: number = -1;

    private _isDone: boolean = false;

    constructor(_tileX: number, _tileY: number, _onAnimEnd: ()=>void) {
        this.tileX = _tileX;
        this.tileY = _tileY;

        var vec2 = MapTile.getInstance().getTileScreenPosition(_tileX, _tileY);
        this.screenX = vec2.x;
        this.screenY = vec2.y;

        this.onAnimEnd = _onAnimEnd;
    }

    public update() {
        if (this._isDone) return;

        var time = Date.now();
        if ((time - this._currentTick) > this._animSpeed) {
            this._currentTick = time;
            this._currentAnimIdx++;
            if (this._currentAnimIdx >= this._BreakBlockAnim.length) {
                this.onAnimEnd(this);
                this._isDone = true;
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D) {
        this.update();

        if (this._isDone || this._currentAnimIdx >= this._BreakBlockAnim.length) return;

        ctx.save();
        ctx.translate(this.screenX, this.screenY);
        this._SpriteSheet.Draw(0,0, 1, this._BreakBlockAnim[this._currentAnimIdx], ctx);
        ctx.restore();
    }
}

export class MapTile {
    private static _instance: MapTile = null;

    private _defaultMapTileOption: IMapTileOption = {
        width: 21,
        height: 15,
        tileWidth: 16,
        tileHeight: 16,
        breakBlockChance: 10,
        blockImg: 'blocks_02.png',
        groundImg: 'blocks_04.png',
        ground2Img: 'blocks_05.png',
        breakableImg: 'blocks_03.png'
    };

    private _mapOption: IMapTileOption;

    private _mapData: Block[] = [];

    private _SpriteSheet: SpriteSheet;

    private _BlockSprites: string[];

    private _logger: Logger = Logger.getInstance();

    private _blockAnim: BreakBlockAnim[] = [];

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
            this._mapOption.groundImg
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
                let block = Block.BREAKBLOCK;

                let col = x % this._mapOption.width;
                let row = Math.floor(x / option.width);

                if (!(Math.floor(x / this._mapOption.width) % 2) &&
                    !((x % this._mapOption.width) % 2)) {
                    block = Block.BLOCK;
                }
                else if (
                    (col < 4 && row == 1)
                    || (col < 4 && row == (this._mapOption.height - 2))
                    || (col < this._mapOption.width && col > (this._mapOption.width - 5) && row == 1)
                    || (col < this._mapOption.width && col > (this._mapOption.width - 5) && row == (this._mapOption.height - 2))

                    || (col == 1 && row < 3)
                    || (col == (this._mapOption.width - 2) && row < 3)
                    || (col == 1 && (row > (this._mapOption.height - 4) && row < this._mapOption.height))
                    || (col == (this._mapOption.width - 2) && row > (this._mapOption.height - 4) && row < this._mapOption.height)
                ) {
                    block = Block.GROUND;
                } else {
                    let rand = ((Math.random() * 100) + 1) >  this._mapOption.breakBlockChance;
                    block = rand ? Block.GROUND : Block.BREAKBLOCK;
                }

                this._mapData.push(block);
            }

        }
    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        this._mapData.forEach((tile_value, index) => {
            this._DrawTile(delta, ctx, tile_value, index);
        });

        this._blockAnim.forEach((block)=>{
            block.Draw(ctx);
        });

    }

    private _DrawTile(delta: number, ctx: CanvasRenderingContext2D, tile_value: number, index: number): void {
        ctx.save();

        let frame = this._SpriteSheet.frames[this._BlockSprites[tile_value]];

        let x = (index % this._mapOption.width) * frame.w;

        let y = (index > 0) ? (Math.floor(index / this._mapOption.width) * frame.h) : 0;

        ctx.translate(x, y);

        ctx.drawImage(this._SpriteSheet._image[1],
            frame.x, frame.y,
            frame.w, frame.h,
            0, 0,
            frame.w, frame.h);
        ctx.restore();
    }

    public getTile(x: number, y: number): Block {
        return this._mapData[x + (y * this._mapOption.width)];
    }

    public getTileScreenPosition(x: number, y: number): Util.Vector2 {
        let vec2 = { x: 0, y: 0 };
        let index = x + (y * this._mapOption.width);
        let frame = this._SpriteSheet.frames[this._BlockSprites[0]];

        vec2.x = (index % this._mapOption.width) * frame.w;
        vec2.y = (index > 0) ? (Math.floor(index / this._mapOption.width) * frame.h) : 0;

        return vec2;
    }

    public getScreenToTilePosition(x: number, y: number): Util.Vector2 {
        let vec2 = { x: 0, y: 0 };
        let frame = this._SpriteSheet.frames[this._BlockSprites[0]];

        vec2.x = Math.floor(x / frame.w);
        vec2.y = Math.floor(y / frame.h);

        return vec2;
    }

    public checkMoveForCollisionX(posX: number, posY: number, boundX: number, boundY: number, intent: number): number {
        let newposition = posX;
        let collide = true;

        let checkLeftPos = Math.floor((posX + intent) / this._mapOption.tileWidth);
        let checkRightPos = Math.floor((posX + intent + boundX) / this._mapOption.tileWidth);
        // let checkPos = Math.floor((posX + intent + boundX) / this._mapOption.tileWidth);

        let tileY = Math.floor((posY) / this._mapOption.tileHeight);
        let tileBottomY = Math.floor((posY + boundY) / this._mapOption.tileHeight);

        if (this._mapData[checkLeftPos + (tileY * this._mapOption.width)] === Block.GROUND
            && this._mapData[checkRightPos + (tileY * this._mapOption.width)] === Block.GROUND
            && this._mapData[checkLeftPos + (tileBottomY * this._mapOption.width)] === Block.GROUND
            && this._mapData[checkRightPos + (tileBottomY * this._mapOption.width)] === Block.GROUND) {
            newposition += intent;
            collide = false;
        }

        return newposition;
    }

    public checkMoveForCollisionY(posX: number, posY: number, boundX: number, boundY: number, intent: number): number {
        let newposition = posY;
        let collide = true;

        let checkTopPos = Math.floor((posY + intent) / this._mapOption.tileWidth);
        let checkBottomPos = Math.floor((posY + intent + boundY) / this._mapOption.tileWidth);

        let tileX = Math.floor((posX) / this._mapOption.tileWidth);
        let tileRightX = Math.floor((posX + boundX) / this._mapOption.tileWidth);

        if ((this._mapData[tileX + (checkTopPos * this._mapOption.width)] === Block.GROUND)
            && (this._mapData[tileX + (checkBottomPos * this._mapOption.width)] === Block.GROUND)
            && (this._mapData[tileRightX + (checkTopPos * this._mapOption.width)] === Block.GROUND)
            && (this._mapData[tileRightX + (checkBottomPos * this._mapOption.width)] === Block.GROUND)) {
            newposition += intent;
            collide = false;
        }

        return newposition;
    }

    public DestroyTile(tilex: number, tiley: number) {
        this._blockAnim.push(new BreakBlockAnim(tilex,tiley,(block)=>{
            var idx = this._blockAnim.indexOf(block);
            this._blockAnim.splice(idx,1);
        }));

        this._mapData[tilex + (tiley * this._mapOption.width)] = Block.GROUND;
    }

    public GetTileBounds(tilex: number, tiley: number): Util.cRectangle {
        let vec2 = this.getTileScreenPosition(tilex,tiley);

        return new Util.cRectangle(vec2.x,vec2.y,this._mapOption.tileWidth,this._mapOption.tileHeight);
    }

    public MarkTileBomb(posX: number, posY: number): Util.cRectangle {
        let tile = this.getScreenToTilePosition(posX,posY);

        this._mapData[tile.x + (tile.y * this._mapOption.width)] = Block.GROUNDBOMB;

        return this.GetTileBounds(tile.x,tile.y);
    }
}
