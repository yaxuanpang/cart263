window.onload = function () {

    let boxA = document.querySelector("#boxA");

    let currentX = boxA.offsetLeft;
    let currentY = boxA.offsetTop;

    //the more it eats, the faster it can get - add a constraint to the max speed(7.5)
    let speed = 1;
    let directionX = 0;
    let directionY = 0;

    function animate() {

        currentX += speed * directionX;
        currentY += speed * directionY;

        boxA.style.left = currentX + "px";
        boxA.style.top = currentY + "px";

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("keydown", function (e) {

        if (e.key === "ArrowRight") {
            directionX = 1;
            directionY = 0;   // stop vertical
        }

        if (e.key === "ArrowLeft") {
            directionX = -1;
            directionY = 0;
        }

        if (e.key === "ArrowUp") {
            directionY = -1;
            directionX = 0;   // stop horizontal
        }

        if (e.key === "ArrowDown") {
            directionY = 1;
            directionX = 0;
        }

    });

};
