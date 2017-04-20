import { State } from './state'
import { Entity } from '../entities/entity'
import { MapTile } from '../entities/map'
import { Player } from '../entities/player'
import { InputController, InputOptions } from '../input'
import { BombManager } from '../entities/bomb-manager'
import { MonsterManager } from '../entities/monster-manager'

export class MainGame extends State {
    // private SprTitleScreen: Entity;
    private _MapTile: MapTile;
    private _Player: Player;
    private _InputController: InputController;
    private _BombManager: BombManager = BombManager.getInstance();
    private _MonsterManager: MonsterManager = MonsterManager.getInstance();

    constructor() {
        super();
        this._MapTile = MapTile.getInstance();
        this.addEntities(this._BombManager);

        this._Player = new Player();
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

        this._MonsterManager.init();
    }

    public Update(delta: number): void {
        super.Update(delta);
        this._MonsterManager.Update(delta);

        this._InputController.Update();
    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        this._MapTile.Draw(delta, ctx);
        super.Draw(delta, ctx);

        this._MonsterManager.Draw(delta,ctx);
    }
}