window.onload = function () {
    console.log("move");

    let box = this.document.querySelector('#draw-box-a');
    box.addEventListener("mousemove", drawBoxcallBack);

    let particle = this.document.createElement("div");
    particle.classList.add("point");
    box.appendChild(particle);


    function drawBoxcallBack(e) {
        console.log("moving");
        console.log(e);
        console.log(this.getBoundingClientRect())
        let offsetX = e.clientX - this.getBoundingClientRect().x
        let offsetY = e.clientY - this.getBoundingClientRect().y
        // this.innerHTML = `x: ${offsetX} y: ${offsetY}`;

        particle.style.left = offsetX + "px";
        particle.style.top = offsetY + "px";
    }
}

