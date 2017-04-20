import { SpriteSheet } from '../spritesheet'
import { Logger } from '../logger'

export class Entity {
    public id: number;
    public x: number;
    public y: number;
    public isVisible: boolean = true;
    public imageName: string = "";
    public textureIDX: number;

    private _SpriteSheet: SpriteSheet = SpriteSheet.getInstance();

    constructor(paramx: number, paramy: number, img: string, textID: number) {
        this.x = paramx;
        this.y = paramy;
        this.imageName = img;
        this.textureIDX = textID;

    }

    public Update(delta: number): void {


    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        if (!this.isVisible || this.imageName === "")
            return;

        try{
                ctx.save();
                ctx.translate(this.x, this.y);
                this._SpriteSheet.Draw(0,0,this.textureIDX,this.imageName,ctx);
                ctx.restore();
        }
        catch(e) {
            Logger.getInstance().error("Error drawing [" + this.imageName +"] :" + e.message , this.imageName);
        }
    }
}