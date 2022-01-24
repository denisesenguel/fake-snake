class Game {

    start() {
        
        this.player = new Player();
        this.collectible = new Collectible();

        console.log(this.collectible);
        this.addToDOM(this.player);
        this.addToDOM(this.collectible);
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


}

class Player {
    constructor() {
        this.name = 'player';
        this.width = 5;
        this.height = 5;
        this.speed = 1;
        this.position = {
            x: 50,
            y: 50
        };
    }
}

class Collectible {

    constructor() {
        this.name = 'collectible';
        this.width = 5;
        this.height = 5;
        this.position = {
            x: 20,
            y: 80
        };
    }
}

const game = new Game;
game.start();