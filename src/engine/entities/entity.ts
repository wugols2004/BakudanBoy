import { SpriteSheet } from '../spritesheet'

export class Entity {
    public id: number;
    public x: number;
    public y: number;
    public isVisible: boolean = true;
    public imageName: string;

    private _SpriteSheet: SpriteSheet = SpriteSheet.getInstance();

    constructor(paramx: number, paramy: number, img: string) {
        this.x = paramx;
        this.y = paramy;
        this.imageName = img;

    }

    public Update(delta: number): void {


    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        if (!this.isVisible )
            return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this._SpriteSheet._image,
            this._SpriteSheet.frames[this.imageName].x, this._SpriteSheet.frames[this.imageName].y,
            this._SpriteSheet.frames[this.imageName].w, this._SpriteSheet.frames[this.imageName].h,
            0, 0,
            this._SpriteSheet.frames[this.imageName].w, this._SpriteSheet.frames[this.imageName].h);
        ctx.restore();
    }
}