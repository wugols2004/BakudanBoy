import { Entity } from './entity'
import { MapTile } from './map'
import * as Util from '../util'

export class Player extends Entity {

	private _currentPosition: Util.Vector2;

	private _offsetPosition: Util.Vector2 = new Util.Vector2(1, -10);

	private _mapTile: MapTile = MapTile.getInstance();

	private _playerSpeed: number = 1;

	constructor() {
		super(0, 0, "front_1.png", 0);

		this.Spawn();
	}

	public Spawn() {
		this._currentPosition = this._mapTile.getTileScreenPosition(1, 1);
		this.UpdatePosition();

	}

	public Update(delta: number): void {
		super.Update(delta);

	}

	public MoveUp() {
		this.y -= this._playerSpeed;
	}

	public MoveDown() {
		this.y += this._playerSpeed;
	}

	public MoveLeft() {
		this.x -= this._playerSpeed;
	}

	public MoveRight() {
		this.x += this._playerSpeed;
	}

	public DropBomb() {

	}

	public UpdatePosition() {
		this.x = this._currentPosition.x + this._offsetPosition.x;
		this.y = this._currentPosition.y + this._offsetPosition.y;
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		super.Draw(delta, ctx);

	}
}
