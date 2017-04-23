import { Entity } from './entity'
import { MapTile, Block } from './map'
import { Logger } from '../logger'
import * as Util from '../util'
import { SpriteSheet } from '../spritesheet'
import { Player } from './player'

enum DIRECTION {
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

	private _monsterVectorY: number = 0;
	private _monsterVectorX: number = 0;

	private _monsterTargetX: number = 0;
	private _monsterTargetY: number = 0;

	private _monsterSpeed: number = 0;

	private _logger: Logger = Logger.getInstance();

	private _monsterWidth: number = 15;
	private _monsterHeight: number = 14;

	private _stopThinking: boolean = false;
	private _maxTileWalk: number = 10;
	private _walkPath: Util.Vector2[] = [];

	private _MonsterManager: MonsterManager;

	private _moveDone: () => void;

	public isHit: boolean = false;

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

	public UpdatePosition() {
		this._currentPosition.x += this._monsterVectorX;
		this._currentPosition.y += this._monsterVectorY;

		if (this._currentPosition.x === this._monsterTargetX
			&& this._currentPosition.y === this._monsterTargetY)
		{
			this._monsterVectorX = 0;
			this._monsterVectorY = 0;

			this._moveDone();
		}

		this.x = this._currentPosition.x + this._offsetPosition.x;
		this.y = this._currentPosition.y + this._offsetPosition.y;;
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		super.Draw(delta, ctx);

	}

	private _Think() {
		if (this._stopThinking) return;

		let currentTilePos = this._mapTile.getScreenToTilePosition(this._currentPosition.x, this._currentPosition.y);
		let count = [0, 0, 0, 0];
		this._walkPath.length = 0;

		//check neighbors for longest tile then turn once
		for (let i = 1; i <= this._maxTileWalk; i++) {
			var block = this._mapTile.getTile(currentTilePos.x, currentTilePos.y - i);
			if (block !== Block.GROUND) {
				break;
			}
			count[DIRECTION.UP]++;
		}

		for (let i = 1; i <= this._maxTileWalk; i++) {
			var block = this._mapTile.getTile(currentTilePos.x, currentTilePos.y + i);
			if (block !== Block.GROUND) {
				break;
			}
			count[DIRECTION.DOWN]++;
		}

		for (let i = 1; i <= this._maxTileWalk; i++) {
			var block = this._mapTile.getTile(currentTilePos.x + i, currentTilePos.y);
			if (block !== Block.GROUND) {
				break;
			}
			count[DIRECTION.RIGHT]++;
		}

		for (let i = 1; i <= this._maxTileWalk; i++) {
			var block = this._mapTile.getTile(currentTilePos.x - i, currentTilePos.y);
			if (block !== Block.GROUND) {
				break;
			}
			count[DIRECTION.LEFT]++;
		}

		var max = 0;
		for (let i = 1; i < count.length; i++) {
			if (count[i] > count[i - 1]) {
				max = i;
			}
		}

		let lastWalkPos = new Util.Vector2(currentTilePos.x,currentTilePos.y);

		for (let i = 1; i <= count[max]; i++) {
			let offX = 0;
			let offY = 0;

			if (max == DIRECTION.UP) offY = -1;
			else if (max == DIRECTION.DOWN) offY = 1;
			else if (max == DIRECTION.LEFT) offX = -1;
			else if (max == DIRECTION.RIGHT) offX = 1;

			lastWalkPos.x += offX;
			lastWalkPos.y += offY;

			this._walkPath.push(new Util.Vector2(offX, offY));
		}


		this._stopThinking = true;
		this._ProcessMovement();
	}

	private async _ProcessMovement() {

		for (let path of this._walkPath) {
			await this._MoveToTile(path);
			// Logger.getInstance().debug("Start move to new Path ", path);
		}

		this._stopThinking = false;
		this._Think();
	}

	private _MoveToTile(path: Util.Vector2): Promise<boolean> {
		return new Promise<boolean>((r, e) => {
			try {
				let vec2 = this._mapTile.getScreenToTilePosition(this._currentPosition.x, this._currentPosition.y);
				this._monsterVectorX = path.x;
				this._monsterVectorY = path.y;

				// Logger.getInstance().debug(this._monsterVectorX, this._monsterVectorY, path, vec2);

				let targetVec2 = this._mapTile.getTileScreenPosition(vec2.x + path.x, vec2.y + path.y);

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

	public GetHitBounds(): Util.cRectangle{
		let rect = new Util.cRectangle(this._currentPosition.x,this._currentPosition.y,this._monsterWidth,this._monsterHeight);
		Logger.getInstance().debug(rect);
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
		});
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		this._Monsters.forEach((monster) => {
			monster.Draw(delta, ctx);
		});
	}

	public SpawnMonster(tileX: number, tileY: number) {
		this._Monsters.push(new Monster(this,tileX, tileY));
	}

	public init(player: Player) {
		this._Player = player;

		this.SpawnMonster(1, 13);
		this.SpawnMonster(19,13);
		this.SpawnMonster(19,1);
	}

	public GetMonsters (): Monster[] {
		return this._Monsters;
	}

	public DeleteMonster(monster: Monster) {
		let idx = this._Monsters.indexOf(monster);
		this._Monsters.splice(idx, 1);
	}
}