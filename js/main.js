class Game {

    start() {
        
        // create basic elements
        this.player = new Player();
        this.collectible = new Collectible();
        
    }


}

class Player {
    constructor() {
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
        this.width = 5;
        this.width = 5;
        this.position = {
            x: 20,
            y: 80
        };
    }
}