import { State } from './state'
import { Entity } from '../entities/entity'


export class TitleScreen extends State {
    private SprTitleScreen: Entity;

    constructor() {
        super();

        this.SprTitleScreen = new Entity(0, 0, 'titlescreen/background.png');

        this.addEntities(this.SprTitleScreen);
    }

    public Update(delta: number): void {
        super.Update(delta);
    }

    public Draw(delta: Number, ctx: CanvasRenderingContext2D): void {
        super.Draw(delta, ctx);
    }
}