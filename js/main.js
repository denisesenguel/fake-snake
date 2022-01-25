class Game {

    start() {
        
        this.player = new Player();
        this.collectible = new Collectible(this.player.position);

        this.player.htmlElm = this.addNewElm(this.player);
        this.positionElm(this.player);
        this.collectible.htmlElm = this.addNewElm(this.collectible);
        this.positionElm(this.collectible);

        this.addEventListeners();
    }

    addNewElm(object) {
        
        const newElm = document.createElement('div');
        
        newElm.className = object.name;
        newElm.style.width = object.width + "%";
        newElm.style.height = object.height + "%";

        document.getElementById('board').appendChild(newElm);
    
        return newElm;
    }

    positionElm(object) {
        object.htmlElm.style.top = object.position.y + "%";
        object.htmlElm.style.left = object.position.x + "%";
    }

    exchangeCollectible() {

        document.getElementById('board').removeChild(this.collectible.htmlElm); 
        this.collectible = new Collectible(this.player.position);
        this.collectible.htmlElm = this.addNewElm(this.collectible);
        this.positionElm(this.collectible);
    }

    
    addEventListeners() {
        
        document.addEventListener('keydown', event => {
            
            if (this.player.intervalID) clearInterval(this.player.intervalID);

            if (event.key.includes('Arrow')) {

                const direction = event.key.replace('Arrow', '');
                
                this.player.intervalID = setInterval(() => {
    
                    this.player.move(direction);
                    this.isGameOver();
    
                    if (this.hasCollected()) this.exchangeCollectible();

                    this.positionElm(this.player);
    
                }, this.player.speed.interval);
            }
        });
    }

    isGameOver() {
        if (this.player.position.x > 100 - this.player.width || this.player.position.y > 100 - this.player.height || 
            this.player.position.x < 0 || this.player.position.y < 0) {
            alert("game over");
        }
    }

    hasCollected() {
        if (this.player.position.x == this.collectible.position.x && this.player.position.y == this.collectible.position.y) {
            return true;
        } 
    }

}

class boardObject {
    
    constructor(type, position) {
        this.name = type;
        this.width = 5;
        this.height = 5;
        this.position = position;
    }
}

class Player extends boardObject{
    
    constructor() {
        super('player', {x: 50, y: 50});
        this.speed = {
            stepSize: 5,
            interval: 100
        };
        this.currentDirection = null;
    }

    move(direction) {

        switch (direction) {
            case 'right':
            case 'Right':
                if (this.currentDirection !== 'left') {
                    this.position.x += this.speed.stepSize;
                    this.currentDirection = 'right';
                } else {
                    this.move('left');
                }
                break;
            case 'left':
            case 'Left':
                if (this.currentDirection !== 'right') {
                    this.position.x -= this.speed.stepSize;
                    this.currentDirection = 'left';
                } else {
                    this.move('right');
                }
                break;
            case 'up':
            case 'Up':
                if (this.currentDirection !== 'down') {
                    this.position.y -= this.speed.stepSize;
                    this.currentDirection = 'up';
                } else {
                    this.move('down');
                }
                break;
            case 'down':
            case 'Down':
                if (this.currentDirection !== 'up') {
                    this.position.y += this.speed.stepSize;
                    this.currentDirection = 'down';
                } else {
                    this.move('up');
                }
                break;
            default:
                throw new Error('Please specify direction. Allowed values: "left/Left", "right/Right", "up/Up", "down/Down".');
        }
    }
}

class Collectible extends boardObject{

    constructor(excludePosition) {

        super('collectible', {x: 0, y: 0});

        this.randomPosition = function(exclude) {
            let x, y, r1 = Math.random(), r2 = Math.random();

            x = Math.floor(r1 * (100 / this.width)) * this.width;
            y = Math.floor(r2 * (100 / this.height)) * this.height;

            if (exclude.x == x && exclude.y == y) {
                this.randomPosition(exclude);
            } else {
                return {x : x, y: y};  
            }
        };
        this.position = this.randomPosition(excludePosition);
    }
}

const game = new Game();
game.start();