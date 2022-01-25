class Game {

    constructor() {
        this.score = 0;
        this.controller = new AbortController;
    }

    start() {

        document.querySelector(".start-and-end").style.display = "none";
        document.querySelector(".container").style.display = "flex"; 

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
    
    isGameOver() {
        if (this.player.position.x > 100 - this.player.width || 
            this.player.position.y > 100 - this.player.height || 
            this.player.position.x < 0 || 
            this.player.position.y < 0) {
            
            return true;
        }
    }
        
    hasCollected() {
        if (this.player.position.x == this.collectible.position.x && this.player.position.y == this.collectible.position.y) {
            return true;
        } 
    }
    
    addToScore() {
        this.score += 10;
        document.getElementById("score-box").innerText = `Score: ${this.score}`;
    }

    addEventListeners() {
        
        document.addEventListener('keydown', event => {
            
            if (this.player.intervalID) clearInterval(this.player.intervalID);

            if (event.key.includes('Arrow')) {

                const direction = event.key.replace('Arrow', '');
                
                this.player.intervalID = setInterval(() => {
    
                    this.player.move(direction);
                    
                    if (this.isGameOver()) {
                        this.stop();
                    }
    
                    if (this.hasCollected()) {
                        this.exchangeCollectible();
                        this.addToScore();
                    }

                    this.positionElm(this.player);
    
                }, this.player.speed.interval);
            }
        }, { signal: this.controller.signal });
    }

    stop() {

        clearInterval(this.player.intervalID);

        document.getElementById("board").innerHTML = "";
        document.getElementById("score-box").innerText = "Score: 0";
        document.querySelector(".container").style.display = "none";
        
        document.querySelector(".start-and-end").style.display = "flex";

        document.querySelector(".start-and-end h1").innerText = "Game Over!";
        document.querySelector(".start-and-end h2").innerText = `Your Score: ${this.score}`;
        document.getElementById("play").innerText = "Play again!";
        
        this.controller.abort();
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
        super('player', {x: 50, y: 20});
        this.speed = {
            stepSize: 5,
            interval: 100
        };
        this.currentDirection = null;
        this.intervalID = null;
        this.tail = [{
            x: this.position.x,
            y: this.position.y - this.height
        }];
    }

    move(direction) {

        if (direction != this.currentDirection) {

            this.tail[0] = this.position;
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
                    throw new Error('Please specify direction. Allowed values: "left/Left", "right/Right", "up/Up", "down/Down".');
            }

        } else {
            this.move(this.currentDirection);
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

document.getElementById("play").addEventListener('click', () => {
    
    const game = new Game();
    game.start();
});