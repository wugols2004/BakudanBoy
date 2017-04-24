import { Entity } from './entity'
import { MapTile, Block } from './map'
import { Logger } from '../logger'
import * as Util from '../util'
import { SpriteSheet } from '../spritesheet'
import { Player } from './player'

enum DIRECTION {
	NULL = -1,
	UP = 0,
	DOWN,
	LEFT,
	RIGHT,
	COUNT
}

export class Monster extends Entity {
	private _currentPosition: Util.Vector2;

	private _offsetPosition: Util.Vector2 = new Util.Vector2(1, -10);

	private _mapTile: MapTile = MapTile.getInstance();

	/**
	 * vertical move speed of monster
	 * @type {number}
	 */
	private _monsterVectorY: number = 0;

	/**
	 * horizontal move speed of monster
	 * @type {number}
	 */
	private _monsterVectorX: number = 0;

	/**
	 * target X screen position of monster movement
	 * @type {number}
	 */
	private _monsterTargetX: number = 0;

	/**
	 * target Y screen position of monster movement
	 * @type {number}
	 */
	private _monsterTargetY: number = 0;

	private _logger: Logger = Logger.getInstance();

	private _monsterWidth: number = 15;
	private _monsterHeight: number = 15;

	private _stopThinking: boolean = false;
	private _maxTileWalk: number = 10;
	// private _walkPath: Util.Vector2[] = [];

	private _MonsterManager: MonsterManager;

	private _moveDone: () => void;

	public isHit: boolean = false;

	private _moveDirection: DIRECTION = DIRECTION.UP;

	private _maxThinkCount: number = 0;

	private _EndGame: () => void = null;

	private _StopMonsters: boolean = false;

	constructor(manager: MonsterManager, tilex: number, tiley: number) {
		super(0, 0, "front_1_enemy.png", 2);

		this.Spawn(manager, tilex, tiley);
	}

	public Spawn(manager: MonsterManager, tilex: number, tiley: number) {
		this._MonsterManager = manager;
		this._currentPosition = this._mapTile.getTileScreenPosition(tilex, tiley);
		this._isHit = false;
		this.UpdatePosition();
		this._Think();
	}

	public Update(delta: number): void {
		super.Update(delta);
		this.UpdatePosition();
	}

	private UpdatePosition() {
		this._currentPosition.x += this._monsterVectorX;
		this._currentPosition.y += this._monsterVectorY;

		if (this._currentPosition.x === this._monsterTargetX
			&& this._currentPosition.y === this._monsterTargetY) {
			this._monsterVectorX = 0;
			this._monsterVectorY = 0;

			this._moveDone();
		}

		this.x = this._currentPosition.x + this._offsetPosition.x;
		this.y = this._currentPosition.y + this._offsetPosition.y;;
	}

	public StopMonsters(): void {
		this._StopMonsters = true;
		this._moveDone();
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		super.Draw(delta, ctx);

	}

	private _Think() {
		if (this.isHit || this._StopMonsters) return;

		if (this._maxThinkCount < 4) {
			let currentTilePos = this._mapTile.getScreenToTilePosition(this._currentPosition.x, this._currentPosition.y);
			switch (this._moveDirection) {
				case DIRECTION.UP:
					let block = this._mapTile.getTile(currentTilePos.x, currentTilePos.y - 1);
					if (block !== Block.GROUND) {
						this._moveDirection = DIRECTION.DOWN;
						this._maxThinkCount++;
						this._Think();
					}
					break;
				case DIRECTION.DOWN:
					let block = this._mapTile.getTile(currentTilePos.x, currentTilePos.y + 1);
					if (block !== Block.GROUND) {
						this._moveDirection = DIRECTION.RIGHT;
						this._maxThinkCount++;
						this._Think();
					}
					break;
				case DIRECTION.RIGHT:
					let block = this._mapTile.getTile(currentTilePos.x + 1, currentTilePos.y);
					if (block !== Block.GROUND) {
						this._moveDirection = DIRECTION.LEFT;
						this._maxThinkCount++;
						this._Think();
					}
					break;
				case DIRECTION.LEFT:
					let block = this._mapTile.getTile(currentTilePos.x - 1, currentTilePos.y);
					if (block !== Block.GROUND) {
						this._moveDirection = DIRECTION.UP;
						this._maxThinkCount++;
						this._Think();
					}
					break;
				default:
					// code...
					// dont go here!!!
					break;
			}
		} else {
			this._moveDirection = DIRECTION.NULL;
		}

		this._ProcessMovement(this._moveDirection);
	}

	private async _ProcessMovement(moveDirection: DIRECTION) {
		await this._MoveToTile(moveDirection);
		this._maxThinkCount = 0;
		this._Think();
	}

	private _MoveToTile(moveDir: DIRECTION): Promise<boolean> {
		return new Promise<boolean>((r, e) => {
			try {
				let currentTilePos = this._mapTile.getScreenToTilePosition(this._currentPosition.x, this._currentPosition.y);
				let path = new Util.Vector2(0, 0);

				switch (moveDir) {
					case DIRECTION.UP:
						path.y = -1;
						break;
					case DIRECTION.DOWN:
						path.y = 1;
						break;
					case DIRECTION.RIGHT:
						path.x = 1;
						break;
					case DIRECTION.LEFT:
						path.x = -1;
						break;
					default:
						// code...
						break;
				}

				this._monsterVectorX = path.x;
				this._monsterVectorY = path.y;


				let targetVec2 = this._mapTile.getTileScreenPosition(currentTilePos.x + path.x, currentTilePos.y + path.y);

				this._monsterTargetX = targetVec2.x;
				this._monsterTargetY = targetVec2.y;

				this._moveDone = () => {
					r(true);
				};
			} catch (err) {
				e(err);
			}
		});
	}

	public GetHitBounds(): Util.cRectangle {
		let rect = new Util.cRectangle(this._currentPosition.x, this._currentPosition.y, this._monsterWidth, this._monsterHeight);
		return rect;
	}

	public async Die() {
		Logger.getInstance().debug("Monster Die!");
		this.isHit = true;
		this.imageName = "dead_1_enemy.png";
		await Util.sleep(1000);
		this._MonsterManager.DeleteMonster(this);
	}
}

export class MonsterManager {
	private static _instance: MonsterManager = null;
	private _Monsters: Monster[] = [];
	private _Player: Player = null;

	constructor() {
		if (MonsterManager._instance) {
			throw new Error('Logger is a singleton');
		}
		MonsterManager._instance = this;
		return MonsterManager._instance;
	}

	public static getInstance(): MonsterManager {
		if (MonsterManager._instance == null) {

			MonsterManager._instance = new MonsterManager();
		}
		return MonsterManager._instance;
	}

	public Update(delta: number): void {
		this._Monsters.forEach((monster) => {
			monster.Update(delta);

			if(this._Player.GetHitBounds().collides(monster.GetHitBounds())){
				this._Player.Die();
			}
		});


	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		this._Monsters.forEach((monster) => {
			monster.Draw(delta, ctx);
		});
	}

	public SpawnMonster(tileX: number, tileY: number) {
		this._Monsters.push(new Monster(this, tileX, tileY));
	}

	public init(player: Player, endgame: () => void) {
		this._Player = player;
		this._EndGame = endgame;

		this._Monsters.length = 0;

		this.SpawnMonster(1, 13);
		this.SpawnMonster(19, 13);
		this.SpawnMonster(19, 1);
	}

	public GetMonsters(): Monster[] {
		return this._Monsters;
	}

	public GetPlayers(): Monster[] {
		return this._Player;
	}

	public StopMonsters(): void {
		this._Monsters.forEach((monster)=>{
			monster.StopMonsters();
		});
	}

	public DeleteMonster(monster: Monster) {
		let idx = this._Monsters.indexOf(monster);
		this._Monsters[idx].isVisible = false;

		let check = false;
		this._Monsters.forEach((monster)=>{
			if(!check) check = monster.isVisible;
		});

		if(!check)
			this._EndGame();
	}
}