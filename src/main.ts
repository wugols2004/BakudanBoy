import { Game } from './engine/game'

console.log('Welcome to Bakudan Boy!');

var myGame = new Game({
    width: 800,
    height: 600,
    canvasElementId: 'canvas-game',
    spriteSheetUrl: './assets/image/bbo_textures.png',
    timeScale: 1,
});
myGame.start();
