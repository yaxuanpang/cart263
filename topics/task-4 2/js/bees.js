class Bee {
    constructor(x, y, width, height, home) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.home = home;
        this.isreturn = false;
    }

    return() {
        this.isreturn = true;
    }

    renderBee() {
        this.beeElement = document.createElement('img');
        this.beeElement.src = 'assets/bee.svg';
        this.beeElement.style.position = 'absolute';
        this.beeElement.classList.add('bee');
        this.beeElement.style.width = this.width + 'px';
        this.beeElement.style.height = this.height + 'px';

        document.body.appendChild(this.beeElement);
        return this.beeElement;
    }

    animateBee() {
        let bee = this;
        let direction = 1;
        let speed = 5;

        setTimeout(() => { // bees wander for 10 seconds before going back to the hive
            bee.return();
        }, 10000);

        function moveBee() {
            if (!bee.isreturn) {

                bee.x += speed * direction;

                //bees wrap around when they go off screen
                if (bee.x > window.innerWidth) {
                    bee.x = -bee.width;
                }
                if (bee.x < -bee.width) {
                    bee.x = window.innerWidth;
                    direction = 1;
                }
            } else {
                //calculate center of hive as target
                let targetX = bee.home.x + (bee.home.size / 2) - (bee.width / 2);
                let targetY = bee.home.y + (bee.home.height / 2) - (bee.height / 2);


                // if the bees go past the nearest hive, the bees wrap around and goes to the nearest hive
                let hasPassedHive = (direction === 1 && bee.x > targetX + 50) ||
                    (direction === -1 && bee.x < targetX - 50);

                if (hasPassedHive) {
                    bee.x = (direction === 1) ? -bee.width : window.innerWidth;
                }

                // make sure bee moves at constant speed by claculating the distance
                //to the target
                let dx = targetX - bee.x;
                let dy = targetY - bee.y;
                let distance = Math.sqrt(dx * dx + dy * dy);


                if (distance > 1) {

                    bee.x += (dx / distance) * speed;
                    bee.y += (dy / distance) * speed;
                }


                if (distance < 5) {
                    bee.beeElement.remove();
                    bee.home.beeEntered();
                    return;
                }
            }

            bee.beeElement.style.left = bee.x + "px";
            bee.beeElement.style.top = bee.y + "px";

            requestAnimationFrame(moveBee);
        }

        moveBee();
    }
}

class BeeHive {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.height = Math.round(size * 1.35);
        this.color = color;
        this.beehiveDiv = document.createElement("div");
        this.holeDiv = document.createElement("div");
        this.beeCounter = 0;
        this.rotation = 0; // actual hive rotation
        this.angle = 1; // x in sine function
        //STEP 6
        // displayBeeCountingorwhatever () {
        //const h3 = this.holeDiv.querySelector("h3");
        //h3.textContent = this.beeCounteror whatever the picked;
        //h3.style.color = "rgba(244, 195, 110, 1)";}//become visible after 1 bee goes home
    }

    rotateHives() {
        this.rotation = Math.sin(this.angle) * 10; // last multiplier = amplitude
        this.angle += 0.02; // rythm

        this.beehiveDiv.style.rotate = this.rotation + "deg"; //updates the rotation of the hives
    }

    renderBeeHive() {
        this.beehiveDiv.classList.add("beehive");
        this.beehiveDiv.style.width = this.size + "px";
        this.beehiveDiv.style.height = this.height + "px";
        this.beehiveDiv.style.left = this.x + "px";
        this.beehiveDiv.style.top = this.y + "px";
        this.beehiveDiv.style.background = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        this.beehiveDiv.style.rotate = this.rotation + "deg";

        this.beehiveDiv.innerHTML = "";
        this.stripes = [];
        const stripeCount = 5;
        for (let i = 0; i < stripeCount; i++) {
            const stripe = document.createElement("div");
            stripe.classList.add("beehive__stripe");
            stripe.style.top = i * (this.height / stripeCount) + "px";
            this.beehiveDiv.appendChild(stripe);
            this.stripes.push(stripe);
        }

        this.holeDiv.innerHTML = `<h3>${this.beeCounter}</h3>`;

        this.holeDiv.classList.add("beehive__hole");
        this.beehiveDiv.appendChild(this.holeDiv);
        //STEP 6
        //this.beehiveDiv.addEventListener("click", () => {
        // this.displayBeeCounting or whatever; //when hive click number of bee shows

        const grass = document.querySelector(".grass");
        const sky = document.querySelector(".sky");
        (sky || grass)?.appendChild(this.beehiveDiv);
    }
}