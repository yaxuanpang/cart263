window.onload = function () {
    const snake = new Snake(10, 10);
    const targetOne = new Target();
    const targetTwo = new Target();
    const birdOne = new Bird();
    const birdTwo = new Bird();

    setInterval(function () {
        snake.move();
        snake.checkCollision(targetOne);
        snake.checkCollision(targetTwo);
        snake.checkCollision(birdOne);
        snake.checkCollision(birdTwo);
        snake.renderSnake();
        targetOne.renderTarget();
        targetTwo.renderTarget();
        birdOne.renderBird();
        birdTwo.renderBird();
    }, 200);
};