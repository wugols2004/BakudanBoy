import { State } from './state'
import { Entity } from '../entities/entity'
import { MapTile } from '../entities/map'
import { Player } from '../entities/player'
import { InputController, InputOptions } from '../input'
import { BombManager } from '../entities/bomb-manager'
import { MonsterManager } from '../entities/monster-manager'
import { WindowManager } from '../window-manager'
import { Logger } from '../logger'

export class MainGame extends State {
    // private SprTitleScreen: Entity;
    private _MapTile: MapTile;
    private _Player: Player;
    private _InputController: InputController;
    private _BombManager: BombManager = BombManager.getInstance();
    private _MonsterManager: MonsterManager = MonsterManager.getInstance();
    private _WindowManager: WindowManager = WindowManager.getInstance();

    private _isPause: boolean = false;

    private _mouseDownListener: ()=>void = null;

    constructor() {
        super();
        this._MapTile = MapTile.getInstance();
        this.addEntities(this._BombManager);

        this._Player = new Player(()=>{this.EndGame();});
        this.addEntities(this._Player);

        this._InputController = new InputController(
            {
                Up_KeyDown: ()=>{this._Player.MoveUp();},
                Down_KeyDown: ()=>{this._Player.MoveDown();},
                Left_KeyDown: ()=>{this._Player.MoveLeft();},
                Right_KeyDown: ()=>{this._Player.MoveRight();},
                BOMB_KeyDown: ()=>{this._Player.DropBomb();},
                ESC_KeyDown: (): void => {},

                Up_KeyUp: ()=>{this._Player.MoveUp();},
                Down_KeyUp: ()=>{this._Player.MoveDown();},
                Left_KeyUp: ()=>{this._Player.MoveLeft();},
                Right_KeyUp: ()=>{this._Player.MoveRight();},
                BOMB_KeyUp: ()=>{this._Player.DropBomb();},
                ESC_KeyUp: (): void => {}
            }
        );

        this._MonsterManager.init(this._Player,()=>{this.EndGame();});

        this._mouseDownListener = ()=>{this.InitGame();};
    }

    public EndGame(): void {
        this._isPause = true;
        this._MonsterManager.StopMonsters();
        window.addEventListener("mousedown", this._mouseDownListener);
    }

    public InitGame (): void {
        Logger.getInstance().debug("Init Game..");
        this._isPause = false;

        this._Player.Spawn();
        this._MonsterManager.init(this._Player,()=>{this.EndGame();});

        window.removeEventListener("mousedown", this._mouseDownListener);
    }

    public Update(delta: number): void {
        super.Update(delta);

        if(!this._isPause) {
            this._MonsterManager.Update(delta);
            this._InputController.Update();
        }
    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        this._MapTile.Draw(delta, ctx);
        super.Draw(delta, ctx);

        this._MonsterManager.Draw(delta,ctx);

        if(this._isPause) {
            ctx.save();
            ctx.font = "25px Arial";
            let centerX = this._WindowManager.canvasWidth / 2;
            let centerY = this._WindowManager.canvasHeight / 2;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over!",centerX,centerY - 50);
            ctx.strokeText("Game Over!",centerX,centerY - 50);
            ctx.fillText("Click on screen to play again",centerX,centerY);
            ctx.strokeText("Click on screen to play again",centerX,centerY);

            ctx.restore();
        }
    }
}