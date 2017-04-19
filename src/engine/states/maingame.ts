import { State } from './state'
import { Entity } from '../entities/entity'
import { MapTile } from '../entities/map'
import { Player } from '../entities/player'


export class MainGame extends State {
    // private SprTitleScreen: Entity;
    private _MapTile: MapTile;
    private _Player: Player;


    constructor() {
        super();
        this._MapTile = new MapTile();

        this._Player = new Player();
        this.addEntities(this._Player);
    }

    public Update(delta: number): void {
        super.Update(delta);
    }

    public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
        this._MapTile.Draw(delta, ctx);
        super.Draw(delta, ctx);
    }
}