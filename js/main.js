class Game {

    start() {
        
        this.player = new Player();
        this.collectible = new Collectible();

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
        this.collectible = new Collectible();
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
    }

    move(direction) {

        switch (direction) {
            case 'right':
            case 'Right':
                this.position.x += this.speed.stepSize;
                break;
            case 'left':
            case 'Left':
                this.position.x -= this.speed.stepSize;
                break;
            case 'up':
            case 'Up':
                this.position.y -= this.speed.stepSize;
                break;
            case 'down':
            case 'Down':
                this.position.y += this.speed.stepSize;
                break;
            default:
                throw new Error('Please specify direction. Allowed values: "left", "right","up", "down".');
        }
    }
}

class Collectible extends boardObject{

    constructor() {
        super('collectible', {x: 0, y: 0});

        this.randomPosition = function(excludeThis) {
            const n = Math.floor(Math.random() * ((100 / this.width) - 1)) * this.width;
            return (n >= excludeThis) ? n++ : n;
        };
        this.position.x = this.randomPosition(101);
        this.position.y = this.randomPosition(101);
    }
}

const game = new Game();
game.start();