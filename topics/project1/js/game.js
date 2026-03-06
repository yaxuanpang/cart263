window.onload = function () {
    //a start button to start the game
    const startButton = document.querySelector('.startButton');
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none';
        startGame();
    });

    // function for the game mechanics
    function startGame() {
        //defining the constants (snake, tragets)
        const snake = new Snake(10, 10);
        const targetOne = new Target();
        const targetTwo = new Target();
        // defining the birds
        let birds = [];
        window.currentBirds = birds;

        //SCORE
        let score = 0; //default at zero
        const scoreCounter = document.getElementById("score");
        scoreCounter.textContent = "Score: 0";
        function increaseScore() { //updates score by adding one each time
            score++;
            scoreCounter.textContent = "Score: " + score;
        }
        function resetScore() { //resets score back to zero
            score = 0;
            scoreCounter.textContent = "Score: " + score;
        }
        function decreaseScore() {
            score--;
            scoreCounter.textContent = "Score: " + score;
        }

        setInterval(function () {
            birds.push(new Bird());
        }, 3000); // pushes a new bird every 3 seconds

        // everything here is repeated every 200 interval
        setInterval(function () {
            snake.move();

            // if the snake resets, restSnake is false and the score resets
            if (snake.resetSnake) {
                resetScore();
                snake.resetSnake = false;
            }

            // when the snake collides with target one or two the score increases
            if (snake.checkCollision(targetOne, "target")) increaseScore();
            if (snake.checkCollision(targetTwo, "target")) increaseScore();

            // when the snake collides with a bird the score decreases
            for (let i = 0; i < birds.length; i++) {
                if (snake.checkCollision(birds[i], "bird")) {
                    decreaseScore();
                }
                birds[i].renderBird();
            }

            snake.renderSnake();
            targetOne.renderTarget();
            targetTwo.renderTarget();

        }, 200);
    }
}