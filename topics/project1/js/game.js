window.onload = function () {
    const snake = new Snake(10, 10);
    const targetOne = new Target();
    const targetTwo = new Target();
    const birdOne = new Bird();
    const birdTwo = new Bird();

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
        snake.move();
        if (snake.resetSnake) { //when resetSnake is true, it reset the score
            resetScore();
            snake.resetSnake = false;
        }
        if (snake.checkCollision(targetOne, "target")) { //checks if snake collides with target, and if so it increments the score
            increaseScore();
        }
        if (snake.checkCollision(targetTwo, "target")) {
            increaseScore();
        }
        if (snake.checkCollision(birdOne, "bird")) {
            decreaseScore();
        }
        if (snake.checkCollision(birdTwo, "bird")) {
            decreaseScore();
        }
        snake.renderSnake();
        targetOne.renderTarget();
        targetTwo.renderTarget();
        birdOne.renderBird();
        birdTwo.renderBird();
    }, 200);
};