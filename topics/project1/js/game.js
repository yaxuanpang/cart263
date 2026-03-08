window.onload = function () {
    //opening page
    const startButton = document.querySelector('.startButton');
    //instructions page
    const instructions = document.getElementById("instructions");
    const playButton = document.getElementById("playButton");
    //losing page
    const restartButton = document.querySelectorAll("#restartButton");
    const gameOver = document.getElementById("gameOver");
    //winning page
    const gameWin = document.getElementById("gameWin");
    //score
    const scoreCounter = document.getElementById("score");
    //heart
    const heartContainer = document.getElementById("heartContainer");
    heart = []; // array for the heart
    heartContainer.innerHTML = '';

    //defining the game loop and if the bird interval
    let gameLoop;
    let showBird;
    let birdCounter = 0;

    //array of 5 hearts
    for (let i = 0; i < 5; i++) {
        const heartIcon = document.createElement('span');
        heartIcon.innerText = '❤️';
        heartIcon.style.fontSize = '24px';
        heartIcon.style.margin = '0 2px';
        heartContainer.appendChild(heartIcon);
        heart.push(heartIcon);
    }


    //after clicking startButton, instructions page shows up
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none';
        instructions.style.display = 'block';
    });

    //after clicking restartButton, game page shows up
    restartButton.forEach(button => {
        button.addEventListener("click", function () {
            gameOver.style.display = 'none';
            gameWin.style.display = 'none';
            location.reload();
            document.querySelectorAll('.box, .target, .bird').forEach(el => el.remove());
        })
    })

    //after clicking playButton, game page shows up
    playButton.addEventListener('click', function () {
        instructions.style.display = 'none';
        startGame();
    });

    function endGame() {
        const endScreen = document.getElementById('endScreen');
        endScreen.style.display = 'none';
        this.reset(window.currentBirds);

    }

    //function for the end of the game
    function endGame() {
        //Stops the game and clears all the birds
        clearInterval(gameLoop);
        clearInterval(showBird);

        //Show the Game Over screen
        gameOver.style.display = 'flex';
    }

    // function for the game mechanics
    function startGame() {
        //defining the constants (snake, tragets)
        const snake = new Snake(10, 10);
        const targetOne = new Target();
        const targetTwo = new Target();
        // defining the birds
        let birds = [];
        window.currentBirds = birds; // all the birds currenlty on the screen

        //SCORE
        let score = 0; //default at zero
        scoreCounter.textContent = "Score: 0";
        function increaseScore() { //updates score by adding one each time
            score++;
            scoreCounter.textContent = "Score: " + score;

            //Win page appears when score gets to 50
            if (score >= 50) {

                // stops the game and clears all the birds
                clearInterval(gameLoop);
                clearInterval(showBird);

                // shows the winning page
                startButton.style.display = 'flex';
                gameWin.style.display = "flex";
            }
        }
        function decreaseScore() {
            if (birdCounter < heart.length) {
                heart[birdCounter].style.visibility = 'hidden';
            }
            score--;
            scoreCounter.textContent = "Score: " + score;
            birdCounter++;

            if (birdCounter === 5) {
                endGame();
            }
        }

        showBird = setInterval(function () {
            birds.push(new Bird());
        }, 3000); // pushes a new bird every 3 seconds

        // everything here is repeated every 200 interval
        gameLoop = setInterval(function () {
            snake.move();

            // if the snake resets, restSnake is false and the game ends
            if (snake.resetSnake) {
                endGame();
                return;
            }

            // when the snake collides with target one or two the score increases
            if (snake.checkCollision(targetOne, "target")) increaseScore();
            if (snake.checkCollision(targetTwo, "target")) increaseScore();

            // when the snake collides with a bird the score decreases
            for (let i = 0; i < birds.length; i++) {
                if (snake.checkCollision(birds[i], "bird")) {
                    decreaseScore();
                }
                birds[i].renderBird(); // a new bird is rendered in a random spot
            }

            snake.renderSnake();
            targetOne.renderTarget();
            targetTwo.renderTarget();

        }, 200);
    }
}