import { Entity } from './entity'

export class State {
    entities: Array<Entity>;

    constructor() {
        this.entities = [];
    }

    public Exit() {
        this.entities.length = 0;
    }

    public addEntities(entity: Entity): Number {
        return this.entities.push(entity);
    }

    public removeEntities(entity: Entity): Number {
        var index = this.entities.indexOf(entity, 0);
        if (index > -1) {
           this.entities.splice(index, 1);
        }
        return this.entities.length;
    }

    public Update(delta: Number): void {
        for (var entity of this.entities) {
            entity.Update(delta);
        }

    }

    public Draw(delta: Number, ctx: CanvasRenderingContext2D): void {
        for (var entity of this.entities) {
            entity.Draw(delta,ctx);
        }
    }
}