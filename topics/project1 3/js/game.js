window.onload = function () {
    const snake = new Snake(10, 10);
    const targetOne = new Target();
    const targetTwo = new Target();

    //SCORE
    let score = 0; //default at zero
    const scoreCounter = document.getElementById("score");
    function updateScore() { //updates score by adding one each time
        score++;
        scoreCounter.textContent = score;
    }
    function resetScore() { //resets score back to zero
        score = 0;
        scoreCounter.textContent = score;
    }

    setInterval(function () {
        snake.move();

        if (snake.resetSnake) { //when resetSnake is true, it reset the score
            resetScore();
            snake.resetSnake = false;
        }
        if (snake.checkSnakeEaten(targetOne)) { //checks if snake collides with target, and if so it increments the score
            updateScore();
        }
        if (snake.checkSnakeEaten(targetTwo)) {
            updateScore();
        }
        snake.renderSnake();
    }, 200);
};