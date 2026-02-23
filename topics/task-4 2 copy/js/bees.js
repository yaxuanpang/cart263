class Bee {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    // Display bee
    renderBee() {
        // Create an image element for the bee
        this.beeElement = document.createElement('img');
        this.beeElement.src = 'assets/bee.svg';
        this.beeElement.style.position = 'absolute';
        this.beeElement.style.left = this.x + 'px';
        this.beeElement.style.top = this.y + 'px';
        this.beeElement.style.width = this.width + 'px';
        this.beeElement.style.height = this.height + 'px';
        //this is so that i can change bee size from css
        this.beeElement.classList.add('bee');

        // Append to the document body, I think you gotta change the this.beElement when we conncect it with the beehive. I'm leaving it this way because I got it to render in the garden like this.
        document.body.appendChild(this.beeElement);

        return this.beeElement;
    }

    //MY FUNCTIONNNN - ASHH
    animateBee() {

        let bee = this;
        let direction = 1;
        let speed = 5;

        function moveBee() {
            bee.x += speed * direction;

            if (bee.x > window.innerWidth - bee.width) {
                direction = -1;
            }
            if (bee.x < 0) {
                direction = 1;
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
        this.stripes = [];
        this.holeDiv = document.createElement("div");
        this.rotation = 0; // actual hive rotation
        this.angle = 1; // x in sine function
        this.beeCounter = 0;
        //STEP 6
        // displayBeeCountingorwhatever () {
        //const h3 = this.holeDiv.querySelector("h3");
        //h3.textContent = this.beeCounteror whatever the picked;
        //h3.style.color = "rgba(244, 195, 110, 1)";}//become visible after 1 bee gioes home
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

