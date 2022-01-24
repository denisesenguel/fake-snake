class Game {

    start() {
        
        this.player = new Player();
        this.collectible = new Collectible();

        this.addToDOM(this.player);
        this.addToDOM(this.collectible);

        this.addEventListeners();
    }

    addToDOM(object) {
        
        const newElm = document.createElement('div');
        
        newElm.className = object.name;
        newElm.style.width = object.width + "%";
        newElm.style.height = object.height + "%";
        newElm.style.top = object.position.y + "%";
        newElm.style.left = object.position.x + "%";

        document.getElementById('board').appendChild(newElm);
    }

    addEventListeners() {

        document.addEventListener('keydown', event => {
            
            switch(event.key) {
                case 'ArrowDown':
                    this.player.move('down');
                    break;
                case 'ArrowUp':
                    this.player.move('up');
                    break;
                case 'ArrowLeft':
                    this.player.move('left');
                    break;
                case 'ArrowRight':
                    this.player.move('right');
                    break;
            }
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
        this.speed = 1;
    }

    move(direction) {

        switch (direction) {
            case 'right':
                this.position.x += this.speed;
                break;
            case 'left':
                this.position.x -= this.speed;
                break;
            case 'up':
                this.position.y -= this.speed;
                break;
            case 'down':
                this.position.y += this.speed;
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