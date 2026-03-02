window.onload = function () {
    const snake = new Snake(10, 10);
    const targetOne = new Target();
    const targetTwo = new Target();

    setInterval(function () {
        snake.move();
        snake.checkCollision(targetOne);
        snake.checkCollision(targetTwo);
        snake.renderSnake();
        targetOne.renderTarget();
        targetTwo.renderTarget();
    }, 200);
};