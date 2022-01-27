const game = new Game;

document.getElementById('try-again').addEventListener('click', () => game.makeVisible("start-screen"));

for (let i = 0; i < 3; i++) {

    document.getElementById(`btn-level-${i}`).addEventListener('click', () => {
        
        // put level number - speed mapping inside game?
        switch (i) {
            case 0: 
                speed = 150;
                break;
            case 1: 
                speed = 100;
                break;
            case 2:
                speed = 50;
                break;
        }

        let count = 3;
        const timer = setInterval(() => {

            game.makeVisible("countdown");

            if (count > 0) {
                document.querySelector("#countdown>h1").innerText = count;
                count--;
            } else {
                clearInterval(timer);
                game.start(speed);
            }
        }, 500);
    });
}