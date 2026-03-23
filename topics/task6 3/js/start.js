window.onload = go_all_stuff;

function go_all_stuff() {
    console.log("go");

    /* for loading the video */
    let videoEl = document.getElementById("video-birds");
    window.addEventListener("click", function () {
        if (videoEl.currentTime === 0) {
            videoEl.play()
        }
    })


    videoEl.loop = true;

    let theCanvases = document.querySelectorAll(".canvases");
    let theContexts = [];
    //add a context for each canvas and put into an array

    for (let i = 0; i < theCanvases.length; i++) {
        let context = theCanvases[i].getContext("2d");
        theContexts.push(context);
    }

    let drawingBoardA = new DrawingBoard(theCanvases[0], theContexts[0], theCanvases[0].id);
    //add a circular object to canvas A
    drawingBoardA.addObj(new CircularObj(100, 100, 20, "#FFC300", "#E6E6FA", drawingBoardA.context))
    drawingBoardA.display();



    let drawingBoardB = new DrawingBoard(theCanvases[1], theContexts[1], theCanvases[1].id);
    //add a rectangular object to canvas B
    drawingBoardB.addObj(new RectangularObj(100, 100, 50, 70, "#FF5733", "#E6E6FA", drawingBoardB.context))
    drawingBoardB.display();

    // //adding the microphone to the second drawing board
    // function animationLoop() {
    //     drawingBoardA.animate();

    //     if (analyser) {
    //         analyser.getByteFrequencyData(dataArray);
    //         drawingBoardB.micData = dataArray; // pass mic data
    //     }

    //     drawingBoardB.animate(); {
    //         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //         for (let i = 0; i < this.objectsOnCanvas.length; i++) {
    //             if (this.micData) {
    //                 this.objectsOnCanvas[i].micData = this.micData;
    //             }
    //             this.objectsOnCanvas[i].update();
    //             this.objectsOnCanvas[i].display();
    //         }
    //     }
    //     drawingBoardC.animate();
    //     drawingBoardD.run(videoEl);

    //     window.requestAnimationFrame(animationLoop);
    // }


    let drawingBoardC = new DrawingBoard(theCanvases[2], theContexts[2], theCanvases[2].id);
    //add a freestyle object to canvas C
    drawingBoardC.addObj(new FreeStyleObj(10, 100, 300, "#CF9FFF", "#CF9FFF", drawingBoardC.context))
    drawingBoardC.display();

    let drawingBoardD = new DrawingBoard(theCanvases[3], theContexts[3], theCanvases[3].id);
    drawingBoardD.addObj(new VideoObj(0, 0, 400, 300, videoEl, drawingBoardD.context))
    drawingBoardD.display();


    /**MICROPHONE */
    let audioCtx;
    let analyser;
    let dataArray;

    async function setupMic() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            let audioContext = new AudioContext();
            let audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            let microphoneIn = audioContext.createMediaStreamSource(audioStream);
            const filter = audioContext.createBiquadFilter();
            const analyser = audioContext.createAnalyser();
            microphoneIn.connect(filter);
            filter.connect(analyser);
            analyser.fftSize = 32;
            let frequencyData = new Uint8Array(analyser.frequencyBinCount);

            function animateFrequencies() {
                analyser.getByteFrequencyData(frequencyData);
                let sum = 0;
                for (let i = 0; i < frequencyData.length; i++) {
                    sum += frequencyData[i];
                }
                let average = sum / frequencyData.length;
                drawingBoardB.getAverage(average); // ← added
                drawingBoardC.getAverage(average);
                requestAnimationFrame(animateFrequencies);
            }
            requestAnimationFrame(animateFrequencies);

        } catch (err) {
            console.log("had an error getting the microphone");
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
    }

    setupMic();

    /*** RUN THE ANIMATION LOOP  */
    window.requestAnimationFrame(animationLoop);

    function animationLoop() {
        /*** CALL THE EACH CANVAS TO ANIMATE INSIDE  */
        drawingBoardA.animate();
        if (analyser && dataArray) {
            analyser.getByteFrequencyData(dataArray);
            console.log(dataArray);
            drawingBoardB.micData = dataArray;
        }
        drawingBoardB.animate();
        drawingBoardC.animate();
        drawingBoardD.run(videoEl)
        window.requestAnimationFrame(animationLoop);
    }



    /** TASK 1:(Drawing Board A) - 
     *  1: animate the circle object(s) somehow/anyhow.. (there may be more than one)
     * You can use the mouse coordinates - the canvas ALREADY has event listeners for mouse click and mouse move
     * implemeneted, as well as the proper mouseX and mouseY (NO need to add)
     * -> ensure that any properties that are changed by the circle object occur in the update method already provided,
     * and use the member properties provided (you may add new ones ... or not :)
     * 
     * 2: add new circle objects (different sizes, positions, colors) to the canvas (board A) using some form of user interaction
     * 3: remove new circle objects from the canvas (board A) using some other form of user interaction 
     * Please for this exercise - do not add any new shapes other than the circular object...
     * 
     */

    /** TASK 2:(Drawing Board B) - 
     *  1: Affect the rectangle by input from the microphone somehow, in real time...
     *  at least two properties of the rectangle need to update and change...
     *  2: apply some arbitrary animation to the rectangle obj (change the properties in the update method provided)
     * -> the code for the microphone has NOT been added  - you need to implement it correctly...
     *  
     */

    /** TASK 3:(Drawing Board C) - 
     *  1: Affect the free-style shape by input from the microphone somehow, in real time...
     *  at least two properties of the free-style shape need to update and change...
     *  2: apply some arbitrary animation to the free-style shape (change the properties in the update method provided)
     * -> the code for the microphone has NOT been added  - you need to implement it correctly...
     *  
     */

    /** TASK 4:(Video - recorded - )
     * // add filters or manipulate the pixels... take user input from the boxes..
     *  1: using thr provided VideoObj class - > 
     * you will see all the code needed for activating  a blur filter on the video - activate it
     * 2: Next: apply the same logic to enable the other 3 possible filters (adding the event listeners etc)
     * -> make sure to look at the input/output ranges for the values
     * 3: -> apply the context filters  to the video for the three filter options (and activate the blur as well)
     * 4: ->  using the mousemove event listener (already applied in the drawing board) - 
     * make the rectangle (over the video) - follow the mouse ... AND change color when you click on the canvas
     * USE & FILL IN THE METHODS ALREADY set out in the VideoObj class...
     * 
     * 
     * PLEASE NOTE: there will be marks taken off if you ignore the instructions ;)
     *  
     */




}