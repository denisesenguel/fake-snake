class Game {

    constructor() {
        this.score = 0;
        this.controller = new AbortController;
    }

    start() {

        document.querySelector(".start-and-end").style.display = "none";
        document.querySelector(".container").style.display = "flex"; 

        this.addPlayer();
        
        this.addNewCollectible();

        this.addEventListeners();
    }

    addNewElm(size, position) {
        
        const newElm = document.createElement('div');
        
        newElm.style.width = size + "%";
        newElm.style.height = size + "%";
        this.positionElm(newElm, position);

        document.getElementById('board').appendChild(newElm);
    
        return newElm;
    }

    positionElm(elm, position) {
        elm.style.top = position.y + "%";
        elm.style.left = position.x + "%";
    }

    addPlayer() {
        
        this.player = new Player();
    
        let newEl;
        this.player.snake.forEach(element => {
            newEl = this.addNewElm(this.player.size, element.position);
            newEl.className = "player";
            element["htmlElm"] = newEl;
        });
    }

    addNewCollectible() {

        if (this.collectible) {
            document.getElementById('board').removeChild(this.collectible.htmlElm); 
        }
        this.collectible = new Collectible(this.player.snake);
        this.collectible.htmlElm = this.addNewElm(this.collectible.size, this.collectible.position);
        this.collectible.htmlElm.className = "collectible";
    }
    
    isGameOver() {
        if (this.player.snake[0].position.x > 100 - this.player.size || 
            this.player.snake[0].position.y > 100 - this.player.size || 
            this.player.snake[0].position.x < 0 || 
            this.player.snake[0].position.y < 0) {
            
            return true;
        }
    }
        
    hasCollected() {
        if (this.player.snake[0].position.x == this.collectible.position.x && this.player.snake[0].position.y == this.collectible.position.y) {
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
                        this.addNewCollectible();
                        this.addToScore();
                    }

                    this.player.snake.forEach(el => this.positionElm(el.htmlElm, el.position));
    
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

class Player {
    
    constructor() {
        this.size = 5;
        this.speed = {
            stepSize: 5,
            interval: 100
        };
        this.generateSnake = function(length, headPosition) {

            this.snake = [];
            for (let i = 0; i < length; i++) {
                this.snake.push(
                    {
                        htmlElm: null,
                        position: {
                            x: headPosition.x,
                            y: headPosition.y + (i * this.size)
                        }
                    }
                );
            }
        };
        this.generateSnake(2, {x: 50, y: 50});
        
        this.currentDirection = null;
        this.intervalID = null;
    }

    move(direction) {

        if (direction != this.currentDirection) {

            this.snake[1].position = { ...this.snake[0].position };
            switch (direction) {
                case 'right':
                case 'Right':
                    this.snake[0].position.x += this.speed.stepSize;
                    break;
                case 'left':
                case 'Left':
                    this.snake[0].position.x -= this.speed.stepSize;
                    break;
                case 'up':
                case 'Up':
                    this.snake[0].position.y -= this.speed.stepSize;
                    break;
                case 'down':
                case 'Down':
                    this.snake[0].position.y += this.speed.stepSize;
                    break;
                default:
                    throw new Error('Please specify direction. Allowed values: "left/Left", "right/Right", "up/Up", "down/Down".');
            }

        } else {
            this.move(this.currentDirection);
        }
    }
}

class Collectible {

    constructor(excludePos) {
        
        this.size = 5;
        this.htmlElm = null;
        this.randomPosition = function(exclude) {
            let x, y, r1 = Math.random(), r2 = Math.random();

            x = Math.floor(r1 * (100 / this.size)) * this.size;
            y = Math.floor(r2 * (100 / this.size)) * this.size;

            for (let i = 0; i < excludePos.length; i++) {
                if (excludePos[i].x == x && excludePos[i].y == y) {
                    this.randomPosition(excludePos);
                } 
            }
            return {x: x, y: y}
        };
        this.position = this.randomPosition(excludePos);
    }
}

document.getElementById("play").addEventListener('click', () => {
    
    const game = new Game();
    game.start();
});