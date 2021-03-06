import { Entity } from './entity'
import { MapTile } from './map'
import { Logger } from '../logger'
import { BombManager } from './bomb-manager'
import * as Util from '../util'

export class Player extends Entity {

	private _currentPosition: Util.Vector2;

	private _offsetPosition: Util.Vector2 = new Util.Vector2(1, -10);

	private _mapTile: MapTile = MapTile.getInstance();

	private _playerSpeed: number = 1;

	private _logger: Logger = Logger.getInstance();

	private _bombManager: BombManager = BombManager.getInstance();

	private _playerWidth: number = 14;
	private _playerHeight: number = 14;

	private _IsDead: boolean = false;

	private _JustBombDroppedRect: Util.cRectangle = null;

	private _EndGame: ()=>void = null;

	constructor(endgame: ()=>void) {
		super(0, 0, "front_1.png", 0);

		this._EndGame = endgame;

		this.Spawn();
	}

	public Spawn() {
		this._IsDead = false;
		this.imageName = "front_1.png";
		this._currentPosition = this._mapTile.getTileScreenPosition(1, 1);
		this.UpdatePosition();

	}

	public Update(delta: number): void {
		super.Update(delta);
		this.UpdatePosition();
	}

	public MoveUp(): void {
		if(!this._IsDead)
			this._currentPosition.y = this._mapTile.checkMoveForCollisionY(this._currentPosition.x,this._currentPosition.y, this._playerWidth, this._playerHeight , -this._playerSpeed);
	}

	public MoveDown(): void {
		if(!this._IsDead)
			this._currentPosition.y = this._mapTile.checkMoveForCollisionY(this._currentPosition.x,this._currentPosition.y, this._playerWidth, this._playerHeight, this._playerSpeed);
	}

	public MoveLeft(): void {
		if(!this._IsDead)
			this._currentPosition.x = this._mapTile.checkMoveForCollisionX(this._currentPosition.x,this._currentPosition.y, this._playerWidth, this._playerHeight, -this._playerSpeed);
	}

	public MoveRight(): void {
		if(!this._IsDead)
			this._currentPosition.x = this._mapTile.checkMoveForCollisionX(this._currentPosition.x,this._currentPosition.y, this._playerWidth, this._playerHeight, this._playerSpeed);
	}

	public DropBomb(): void {
		if(!this._IsDead){
			let justdropped = this._bombManager.SpawnBomb(this._currentPosition.x,this._currentPosition.y);

			if(justdropped!== null){
		    	this._JustBombDroppedRect = justdropped;

		    	if(!this.GetHitBounds().collides(this._JustBombDroppedRect)){
					this._mapTile.MarkTileBombPass(this._JustBombDroppedRect.x,this._JustBombDroppedRect.y);
					this._JustBombDroppedRect = null;
				}
			}

			// if(this._JustBombDroppedRect === null)
			// 	throw new error("this._JustBombDroppedRect is null!", this._JustBombDroppedRect);
		}

	}

	public async Die() {
		Logger.getInstance().debug("Player Die!");
		this._IsDead = true;
		this.imageName = "dead_1.png";
		await Util.sleep(1000);
		this._EndGame();
	}

	public UpdatePosition() {
		this.x = this._currentPosition.x + this._offsetPosition.x;
		this.y = this._currentPosition.y + this._offsetPosition.y;

		if(this._JustBombDroppedRect !== null) {
			if(!this.GetHitBounds().collides(this._JustBombDroppedRect)){
				this._mapTile.MarkTileBomb(this._JustBombDroppedRect.x,this._JustBombDroppedRect.y);
				this._JustBombDroppedRect = null;
			}
		}
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		super.Draw(delta, ctx);

	}

	public GetHitBounds(): Util.cRectangle{
		let rect = new Util.cRectangle(this._currentPosition.x,this._currentPosition.y,this._playerWidth,this._playerHeight);
		return rect;
	}
}
