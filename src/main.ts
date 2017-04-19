import { Game } from './engine/game'

console.log('Welcome to Bakudan Boy!');

var myGame = new Game({
    width: 336,
    height: 240,
    canvasElementId: 'canvas-game',
    spriteSheetUrl: [
        '/assets/image/bakudanboy.png',
        '/assets/image/blocks.png',
        // '/assets/image/enemy.png',
    ],
    timeScale: 1,
});
