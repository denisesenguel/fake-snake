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
    
    addEventListeners() {
        
        document.addEventListener('keydown', event => {
            
            if (this.player.intervalID) clearInterval(this.player.intervalID);

            const direction = event.key.replace('Arrow', '');
            
            this.player.intervalID = setInterval(() => {

                this.player.move(direction);
                this.positionElm(this.player);

            }, this.player.speed.interval);
        });
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
            stepSize: 1,
            interval: 50
        };
    }

    move(direction) {

        switch (direction) {
            case 'right':
            case 'Right':
                if (this.position.x + this.speed.stepSize <= 100 - this.width) {
                    this.position.x += this.speed.stepSize;
                }
                break;
            case 'left':
            case 'Left':
                if (this.position.x >= this.speed.stepSize) {
                    this.position.x -= this.speed.stepSize;
                }
                break;
            case 'up':
            case 'Up':
                if (this.position.y >= this.speed.stepSize) {
                    this.position.y -= this.speed.stepSize;
                }
                break;
            case 'down':
            case 'Down':
                if (this.position.y + this.speed.stepSize <= 100 - this.height) {
                    this.position.y += this.speed.stepSize;
                }
                break;
            default:
                throw new Error('Please specify direction. Allowed values: "left", "right","up", "down".');
        }
    }
}

class Collectible extends boardObject{

    constructor() {
        super('collectible', {x: 20, y: 80});
    }
}

const game = new Game;
game.start();