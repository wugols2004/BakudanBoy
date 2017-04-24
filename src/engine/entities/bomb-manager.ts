import { Entity } from './entity'
import { MapTile, Block } from './map'
import { Logger } from '../logger'
import * as Util from '../util'
import { SpriteSheet } from '../spritesheet'
import { MonsterManager, Monster } from './monster-manager'

const _BOMB_TIME_OUT: number = 1200;

enum BOMB_STATES {
	IDLE,
	EXPLODING,
	CLEAN_UP
}

enum DIRECTION {
	UP = 0,
	DOWN,
	LEFT,
	RIGHT,
	COUNT
}

class BombExplosion {
	private _fireCrossAnim: string[] = [
		'fire_cross_1.png',
		'fire_cross_2.png',
		'fire_cross_3.png',
		'fire_cross_4.png',
		'fire_cross_5.png'
	];

	private _fireDownAnim: string[] = [
		'fire_down_1.png',
		'fire_down_2.png',
		'fire_down_3.png',
		'fire_down_4.png',
		'fire_down_5.png'
	];

	private _fireUpAnim: string[] = [
		'fire_up_1.png',
		'fire_up_2.png',
		'fire_up_3.png',
		'fire_up_4.png',
		'fire_up_5.png'
	];

	private _fireLeftAnim: string[] = [
		'fire_left_1.png',
		'fire_left_2.png',
		'fire_left_3.png',
		'fire_left_4.png',
		'fire_left_5.png'
	];

	private _fireRightAnim: string[] = [
		'fire_right_1.png',
		'fire_right_2.png',
		'fire_right_3.png',
		'fire_right_4.png',
		'fire_right_5.png'
	];

	private _fireExtVerticalAnim: string[] = [
		'fire_ext_ud_1.png',
		'fire_ext_ud_2.png',
		'fire_ext_ud_3.png',
		'fire_ext_ud_4.png',
		'fire_ext_ud_5.png'
	];

	private _fireExtHorizontalAnim: string[] = [
		'fire_ext_lr_1.png',
		'fire_ext_lr_2.png',
		'fire_ext_lr_3.png',
		'fire_ext_lr_4.png',
		'fire_ext_lr_5.png'
	];

	private _bombLength: number = 1;
	private _currentTick: number = 0;
	private _animSpeed: number = 90;
	private _currentAnimIdx: number = 0;

	public onAnimEnd: () => void;

	private tileX: number = -1;
	private tileY: number = -1;

	private screenX: number = -1;
	private screenY: number = -1;

	private _isDone: boolean = false;
	private _isReverse: boolean = false;

	private _SpriteSheet: SpriteSheet = SpriteSheet.getInstance();

	private _BombExplosionLengthArr: number[] = [
		1, //top
		1, //left
		1, //right
		1  //down
	];

	constructor(_tileX: number, _tileY: number, _bombLength: number) {
		this.tileX = _tileX;
		this.tileY = _tileY;

		var vec2 = MapTile.getInstance().getTileScreenPosition(_tileX, _tileY);
		this.screenX = vec2.x;
		this.screenY = vec2.y;

		this._bombLength = _bombLength;

		this._BombExplosionLengthArr = this._CheckExplosionBounds();
	}

	public update() {
		if (!this._isDone) {
			var time = Date.now();
			if ((time - this._currentTick) > this._animSpeed) {
				this._currentTick = time;
				if (this._isReverse) {
					this._currentAnimIdx--;

					if (this._currentAnimIdx < 0) {
						this.onAnimEnd();
						this._isDone = true;
					}
				}
				else {
					this._currentAnimIdx++;

					if (this._currentAnimIdx >= this._fireCrossAnim.length) {
						this._currentAnimIdx = this._fireCrossAnim.length - 1;
						this._isReverse = true;
					}
				}
			}

			this._CheckBombHit();
		}

	}

	private _CheckBombHit(){
		var monsters = MonsterManager.getInstance().GetMonsters();
		var player = MonsterManager.getInstance().GetPlayers();

		// horizontal
		{
			let leftCnt = this._BombExplosionLengthArr[DIRECTION.LEFT];
			let rightCnt = this._BombExplosionLengthArr[DIRECTION.RIGHT];
			let leftX = (leftCnt * 16 * -1);
			let rightX = (rightCnt * 16);

			let tileRect = new Util.cRectangle(leftX + this.screenX,this.screenY,rightX + Math.abs(leftX) + 16,16);

			//Check for Hits
			monsters.forEach((monster) => {
				if (!monster.isHit) {
					if (monster.GetHitBounds().within(tileRect))
						monster.Die();
				}
			});

			if(player.GetHitBounds().within(tileRect)){
				player.Die();
			}
		}

		// verticalsada
		{
			let upCnt = this._BombExplosionLengthArr[DIRECTION.UP];
			let downCnt = this._BombExplosionLengthArr[DIRECTION.DOWN];
			let upX = (leftCnt * 16 * -1);
			let downX = (downCnt * 16);

			let tileRect = new Util.cRectangle(this.screenX,upX + this.screenY,16,downX + Math.abs(upX) + 16);

			//Check for Hits
			monsters.forEach((monster) => {
				if (!monster.isHit) {
					if (monster.GetHitBounds().within(tileRect))
						monster.Die();
				}
			});

			if(player.GetHitBounds().within(tileRect)){
				player.Die();
			}
		}

	}

	public Draw(ctx: CanvasRenderingContext2D) {
		if (this._isDone) return;

		ctx.save();
		ctx.translate(this.screenX, this.screenY);
		//draw center
		this._SpriteSheet.Draw(0, 0, 1, this._fireCrossAnim[this._currentAnimIdx], ctx);
		//vertical
		for (let i = 1; i <= this._BombExplosionLengthArr[DIRECTION.UP]; i++) {
			if (i === (this._bombLength))
				this._SpriteSheet.Draw(0, -16 * i, 1, this._fireUpAnim[this._currentAnimIdx], ctx);
			else
				this._SpriteSheet.Draw(0, -16 * i, 1, this._fireExtVerticalAnim[this._currentAnimIdx], ctx);
		}
		for (let i = 1; i <= this._BombExplosionLengthArr[DIRECTION.DOWN]; i++) {
			if (i === (this._bombLength))
				this._SpriteSheet.Draw(0, 16 * i, 1, this._fireDownAnim[this._currentAnimIdx], ctx);
			else
				this._SpriteSheet.Draw(0, 16 * i, 1, this._fireExtVerticalAnim[this._currentAnimIdx], ctx);
		}

		//horizontal
		for (let i = 1; i <= this._BombExplosionLengthArr[DIRECTION.RIGHT]; i++) {
			if (i === (this._bombLength))
				this._SpriteSheet.Draw(16 * i, 0, 1, this._fireRightAnim[this._currentAnimIdx], ctx);
			else
				this._SpriteSheet.Draw(16 * i, 0, 1, this._fireExtHorizontalAnim[this._currentAnimIdx], ctx);
		}

		for (let i = 1; i <= this._BombExplosionLengthArr[DIRECTION.LEFT]; i++) {
			if (i === (this._bombLength))
				this._SpriteSheet.Draw(-16 * i, 0, 1, this._fireLeftAnim[this._currentAnimIdx], ctx);
			else
				this._SpriteSheet.Draw(-16 * i, 0, 1, this._fireExtHorizontalAnim[this._currentAnimIdx], ctx);
		}

		ctx.restore();
	}

	public isEnd(): boolean {
		return this._isDone;
	}

	private _CheckExplosionBounds(): number[] {
		let boundarray = [0, 0, 0, 0];


		for (let i = 0; i < this._bombLength; i++) {
			let offset = - 1 - i;
			let block = MapTile.getInstance().getTile(this.tileX, this.tileY + offset);
			if (block != Block.GROUND) {
				if (block == Block.BREAKBLOCK) {
					MapTile.getInstance().DestroyTile(this.tileX, this.tileY + offset);
				}
				break;
			}

			boundarray[DIRECTION.UP]++;
		}

		for (let i = 0; i < this._bombLength; i++) {
			let offset = 1 + i;
			let block = MapTile.getInstance().getTile(this.tileX, this.tileY + offset);
			if (block != Block.GROUND) {
				if (block == Block.BREAKBLOCK) {
					MapTile.getInstance().DestroyTile(this.tileX, this.tileY + offset);
				}

				break;
			}

			boundarray[DIRECTION.DOWN]++;
		}

		for (let i = 0; i < this._bombLength; i++) {
			let offset = - 1 - i;
			let block = MapTile.getInstance().getTile(this.tileX + offset, this.tileY);
			if (block != Block.GROUND) {
				if (block == Block.BREAKBLOCK) {
					MapTile.getInstance().DestroyTile(this.tileX + offset, this.tileY);
				}

				break;
			}

			boundarray[DIRECTION.LEFT]++;
		}

		for (let i = 0; i < this._bombLength; i++) {
			let offset = 1 + i;
			let block = MapTile.getInstance().getTile(this.tileX + offset, this.tileY);
			if (block != Block.GROUND) {
				if (block == Block.BREAKBLOCK) {
					MapTile.getInstance().DestroyTile(this.tileX + offset, this.tileY);
				}

				break;
			}

			boundarray[DIRECTION.RIGHT]++;
		}

		Logger.getInstance().debug(boundarray);
		return boundarray;
	}
}


class Bomb extends Entity {
	private _bombSprites: string[] = [
		'bomb_1.png',
		'bomb_2.png',
		'bomb_3.png',
		'bomb_2.png',
	];
	public currentMapPosition: Util.Vector2;
	public toDelete: boolean = false;

	private _bombLength: number = 2;
	private _currentTick: number = 0;
	private _animSpeed: number = 320;
	private _currentBombIdleIdx: number = 0;

	private _kaboom: boolean = false;

	private _bombAnimObj: BombExplosion = null;

	constructor(_tileX: number, _tileY: number) {
		super(0, 0, 'bomb_1.png', 1);

		this.currentMapPosition = new Util.Vector2(_tileX, _tileY);

		var vec2 = MapTile.getInstance().getTileScreenPosition(_tileX, _tileY);

		this.x = vec2.x;
		this.y = vec2.y;

		this.toDelete = false;

		this._BombTimerStart();
	}

	public Update(delta: number): void {
		super.Update(delta);
		this._tick();

		if (this._bombAnimObj !== null) this._bombAnimObj.update();
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		super.Draw(delta, ctx);

		if (this._bombAnimObj !== null) this._bombAnimObj.Draw(ctx);
	}

	private _tick(): boolean {
		if (this._kaboom)
			return false;

		var time = Date.now();
		if ((time - this._currentTick) > this._animSpeed) {
			this.imageName = this._bombSprites[this._currentBombIdleIdx];
			this._currentBombIdleIdx = (this._currentBombIdleIdx + 1) % this._bombSprites.length;
			this._currentTick = time;
			return true;
		}
		return false;
	}
	private async _BombTimerStart() {
		Logger.getInstance().debug("BOMB TIMER STARTED");
		await Util.sleep(_BOMB_TIME_OUT);
		Logger.getInstance().debug("KABOOM");
		await this._processExplosion();
		Logger.getInstance().debug("BOMB DELETE");
		this.toDelete = true;
	}

	private async _processExplosion(): Promise<boolean> {
		return new Promise<boolean>((r, e) => {
			try {
				this._kaboom = true;
				this.imageName = "";
				this._currentTick = 0;
				this._bombAnimObj = new BombExplosion(this.currentMapPosition.x, this.currentMapPosition.y, this._bombLength);

				this._bombAnimObj.onAnimEnd = () => {
					MapTile.getInstance().UnMarkTileBomb(this.x,this.y);
					r(true);
				}
			}
			catch (err) {
				Logger.getInstance().error(err.message);
				e(false);
			}
		});
	}
}

export class BombManager extends Entity {
	private static _instance: BombManager = null;
	private _bombs: Bomb[] = [];
	private _MapTile: MapTile = MapTile.getInstance();
	private _MaxBomb: number = 1;

	constructor() {
		super(0, 0, "", 0);
	}

	public static getInstance(): BombManager {
		if (BombManager._instance == null) {

			BombManager._instance = new BombManager();
		}
		return BombManager._instance;
	}

	public SpawnBomb(posX: number, posY: number): Util.cRectangle {
		if (this._bombs.length >= this._MaxBomb)
			return null;

		let vec2 = this._MapTile.getScreenToTilePosition(posX, posY);
		let found = false;
		//check if current tile is valid
		for (let bomb of this._bombs) {
			if (bomb.currentMapPosition.x == vec2.x &&
				bomb.currentMapPosition.y == vec2.y)
				found = true;
		}

		if (!found) {
			this._bombs.push(new Bomb(vec2.x, vec2.y));
		}

		return this._MapTile.GetTileBounds(vec2.x,vec2.y);
	}

	public Update(delta: number): void {
		super.Update(delta);

		this._bombs.forEach((bomb, idx, bombs) => {
			bomb.Update(delta);

			if (bomb.toDelete) {
				bombs.splice(bombs.indexOf(bomb), 1);
			}
		});
	}

	public Draw(delta: number, ctx: CanvasRenderingContext2D): void {
		super.Draw(delta, ctx);
		this._bombs.forEach((bomb) => {
			bomb.Draw(delta, ctx);
		});
	}
}