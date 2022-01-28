const game = new Game;

document.getElementById('try-again').addEventListener('click', () => game.makeVisible("start-screen"));

for (let i = 0; i < 3; i++) {

    document.getElementById(`btn-level-${i}`).addEventListener('click', () => {
        
        let speed, level;
        // put level number - speed mapping inside game?
        switch (i) {
            case 0: 
                level = "Easy";
                speed = 150;
                break;
                case 1: 
                level = "Medium";
                speed = 100;
                break;
                case 2:
                level = "Hard";
                speed = 50;
                break;
        }
        document.getElementById("level-box").innerText = `Level: ${level}`;

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