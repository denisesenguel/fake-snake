for (let i = 0; i < 3; i++) {

    document.getElementById(`btn-level-${i}`).addEventListener('click', () => {
        
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

            document.querySelector(".start-and-end").style.display = 'none';
            document.getElementById("countdown").style.display = 'flex';

            if (count > 0) {
                document.querySelector("#countdown>h1").innerText = count;
                count--;
            } else {
                clearInterval(timer);

                document.getElementById("countdown").style.display = 'none';

                const game = new Game;
                game.start(speed);
            }
        }, 500);
    });
}