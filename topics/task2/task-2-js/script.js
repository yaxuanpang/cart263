window.onload = setup;

/** function setup */
function setup() {

    console.log("we are a go!")
    /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
    /*** START PART ONE ACCESS */
    /* 1: all paragraph elements */
    /***CODE */

    // console.log(document.getElementsByTagName("p"));

    /***OUTPUT:
     * HTMLCollection(9) [p#1, p#2.img-descript, p#3.img-descript, p#4.img-descript, p#5.img-descript, p#6.img-descript, p#7.img-descript, p#8.img-descript, p#9.img-descript]
     */


    /*************************************** */
    /* 2: only the first paragraph element */
    /***CODE */

    // console.log(document.getElementsByTagName("p")[0]);

    /***OUTPUT:
     * <p id="1"></p>
     */


    /*************************************** */
    /* 3: all elements with the class inner-container */
    /***CODE */

    // console.log(document.getElementsByClassName("inner-container"));

    /***OUTPUT:
     * HTMLCollection(8) [div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container]
     */


    /*************************************** */
    /* 4: the last image element inside the element that has the class img-container */
    /***CODE */

    // console.log(document.getElementsByClassName("img-container")[7]);

    /***OUTPUT:
     * <div class="img-container"></div>
     */


    /*************************************** */
    /* 5A: all h2 elements */
    /* 5B: length of the list in 5A */
    /* 5C: the text content of the first element in the list from 5A */

    //A. CODE

    // console.log(document.querySelectorAll("h2"));

    /***OUTPUT:
     * NodeList [h2]
     * 0: h2
     * length: 1
     * [[Prototype]]: NodeList
    */

    //B. CODE

    // console.log(document.querySelectorAll("h2").length);

    /***OUTPUT: 1
     */

    //C. CODE

    // console.log(document.querySelector("h2"));

    /***OUTPUT:
   <h2> The header of this fancy page</h2>
    */

    /*************************************** */
    /* 6: the element with id name parent */
    /***CODE */

    // console.log(document.getElementById("parent"));

    /***OUTPUT:
     * <section id="parent"></section>
     */

    /*************************************** */
    /*** END PART ONE ACCESS */


    /*************************************** */
    /*** START PART TWO MODIFY */
    /*************************************** */
    /* 1: Select the first paragraph and replace the text within the paragraph... */
    /***CODE */

    // document.getElementById("1").textContent = "New text in paragraph one: text changed by `Nerly, Ashmitha, Ya Xuan` on the following date: `20/01/2026`."

    /*************************************** */
    /* 2: Select all elements in the HTML that have the class name content-container
     and change the background color ... of first and second ...*/
    /***CODE */

    // let Container = document.getElementsByClassName("content-container");
    // for (let i = 0; i < Container.length; i++) {
    //     Container[i].style.backgroundColor = "orange"
    // }
    // for (let i = 1; i < Container.length; i++) {
    //     Container[i].style.backgroundColor = "purple"

    // }
    // for (let i = 2; i < Container.length; i++) {
    //     Container[i].style.backgroundColor = "white"
    // }

    /*************************************** */
    /* 3: Change the src element of the first image element on the page to be ...
    /***CODE */

    // document.querySelector(".img-image").setAttribute("src", "task-2-images/seven.png");

    /*************************************** */
    /* 4: Select the third paragraph element on the page and
    replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
    /***CODE */

    // document.getElementById("4").innerHTML = "<h2>TEST 123</h2>"

    /*************************************** */
    /* 5: Select the fourth paragraph element on the page and
    add to the existing content an h2 element containing the text `TEST 123`
    /***CODE */

    // let allParagraphs = document.querySelectorAll("p");

    // if (allParagraphs[4]) {
    //     allParagraphs[4].innerHTML += "<h2>TEST 123</h2>";
    // }

    /*************************************** */
    /* 6: Select the fifth paragraph element on the page and add to the existing content
    an img element that holds `one.png`, and add the class newStyle to said paragraph element.
    /***CODE */

    // let fifthPara = allParagraphs[5];

    // if (fifthPara) {
    //     fifthPara.classList.add("newStyle");
    //     fifthPara.innerHTML += '<img src="task-2-images/one.png" alt="added image" />';
    // }

    /*************************************** */
    /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];,
    then access all elements with class name inner-container and save to a variable called `innerContainers`. 
    Next, iterate over the colors array, and for each color: 
    assign the element from innerContainers variable with the same index 
    (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
    a background using that color.
    /***CODE */


    // let colors = ['red', 'blue', 'green', 'orange'];
    // let innerContainers = document.getElementsByClassName("inner-container");

    // for (let i = 0; i < colors.length; i++) {
    //     if (innerContainers[i]) {
    //         innerContainers[i].style.backgroundColor = colors[i];
    //     }
    // }


    /*************************************** */
    /*** END PART TWO MODIFY */


    /*************************************** */
    /*** START PART THREE CREATE */
    /*************************************** */
    /* 1: NEW PARAGRAPHS */
    /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
    /* 1B: Create a function:function customCreateElement(parent){ //body } */
    /* 1C:  In the body of customCreateElement create a new parargraph element*/
    /* 1D:  Set the text of this element to be : `using create Element`*/
    /* 1E:  Set the background of this paragraph element to be green */
    /* 1F:  Set the color of the text in this paragraph element to be white */
    /* 1G: Append this new element to the parent variable within the function. */
    /* 1H: Iterate through the allPTagsThree array and call customCreateElement(),
    passing the current allPTagsThree element as the parent with each iteration.*/
    /***CODE */

    let allPTagsThree = document.querySelectorAll("p");

    function customCreateElement(parent) {
        let newPara = document.createElement("p");

        newPara.textContent = "new paragraph";
        newPara.style.backgroundColor = "green";
        newPara.style.color = "white";

        parent.appendChild(newPara);
    }

    for (let pTag of allPTagsThree) {
        customCreateElement(pTag);
    }

    /***EXPLANATION::
     * The first line accesses all paragraph elemnts and stores them in a variable called allTagsThree
     * Then in the function customCreateElement(parent), I created a new paragraph. I changed the content of the text, 
     * the color is white and the background color is green by calling newPara
     * I appended the new paragraph to the parent variable so that the new paragraph is palced inside the parent element
     * The for loop goes through the allTagsThree list and calls it pTag
     * The function customCreateElement(pTag) passes through the paragraph pTag as the parent
     * Because there are 9 paragraphs the loop runs 9 times and there is a new paragraph with the properties that I set
     * in each one
     */

    /*************************************** */
    /* 2: GRID OF BOXES */
    /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
    /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv.
    /* 2C:Then append this new element to the parent variable within the function. 
    /* 2D:Finally, return</code> this new element */
    /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)).
        Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
        Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
    /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense...
        Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
        in a variable i.e. returnedDiv. 
        Set the style (left and top) to the of this element to 
        the necessary x and y position (use the counter variables in the for nested for loop to 
        calculate the new positions.
    /* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
        and otherwise let it have a background of purple.</li>
    /* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
        otherwise lat it have the content `ODD`.*/

    /***CODE */

    function customNewBoxCreate(parent) {
        let newDiv = document.createElement("div");
        newDiv.className = "testDiv";
        parent.appendChild(newDiv);
        return newDiv;
    }

    let gridParent = document.getElementById("new-grid");

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {

            let returnedDiv = customNewBoxCreate(gridParent);

            returnedDiv.style.left = (col * 46.45) + "px";
            returnedDiv.style.top = (row * 46.45) + "px";

            if (row % 2 === 0) {
                returnedDiv.style.backgroundColor = "white";
                returnedDiv.textContent = "EVEN";
            }
            else {
                returnedDiv.style.backgroundColor = "purple";
                returnedDiv.textContent = "ODD";
            }
        }
    }

    /***EXPLANATION::
     * I created a new function called customNewBoxCreate(parent)
     * I first created a new div element that has a class called testDiv and appended it to the parent variable
     * The last line return newDIv, save the box into a new variable outside the function to do more things to it later
     * I created a grid that is 10x10 and saved newDiv into returnedDiv every time customNewBoxCreate is called
     * I adjusted the position of the grid
     * I made every row is divisible by 2 say "even" and white and every odd one say "odd" and purple
     */

    /*************************************** */
    /* 3: GRID OF BOXES II */

    /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ...
        USE the same customNewBoxCreate function..., the only difference is that the parent element 
        for each of these new divs is the element whose id is `new-grid-three`. */
    /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder),
        when it is a column where the remainder is 1 or when the remainder is 2 ... 
        HINT:: look up the % operator.. */
    /* 3C: Then for each of the above cases: give the new divs in the first case a background of red,
            then the second a background of orange and the third yellow. */
    /*  3D: Finally, let each div contain the text content representing the associated remainder
        when dividing by three. */

    /***CODE */

    let gridThreeParent = document.getElementById("new-grid-three");

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {

            let returnedDiv = customNewBoxCreate(gridThreeParent);

            // Position the boxes
            returnedDiv.style.left = (col * 46.45) + "px";
            returnedDiv.style.top = (row * 46.45) + "px";

            // Calculate the remainder once to use for both logic and text
            let remainder = col % 3;

            // Apply colors and set text content to the remainder value
            if (remainder === 0) {
                returnedDiv.style.backgroundColor = "red";
                returnedDiv.textContent = remainder; // Will display "0"
            }
            else if (remainder === 1) {
                returnedDiv.style.backgroundColor = "orange";
                returnedDiv.textContent = remainder; // Will display "1"
            }
            else {
                returnedDiv.style.backgroundColor = "yellow";
                returnedDiv.textContent = remainder; // Will display "2"
            }
        }
    }


    /***EXPLANATION::
     * Created another nested loop to create a new 10x10 grid and made the parent element "new-grid-three"
     * I made every vertical rows red, orange or yellow and made them display 0,1 and 2
     * I made the color and numbers appear for each row with the remainder of the row number divided by 3
     */

    /*************************************** */
    /*** END PART THREE CREATE */
    /*************************************** */





}