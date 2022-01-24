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
            
            switch(event.key) {
                case 'ArrowDown':
                    this.player.move('down');
                    this.positionElm(this.player);
                    break;
                case 'ArrowUp':
                    this.player.move('up');
                    this.positionElm(this.player);
                    break;
                case 'ArrowLeft':
                    this.player.move('left');
                    this.positionElm(this.player);
                    break;
                case 'ArrowRight':
                    this.player.move('right');
                    this.positionElm(this.player);
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