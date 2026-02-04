setup_D();
/** THEME: DECEPTION  */
function setup_D() {
  console.log("in d");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_D`, "ani_canvD", aniA, aniB, aniC, aniD);

  function aniA(parentCanvas) {
    console.log("in ani-A -teamD");
  }


  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
    console.log("in ani-B -teamD");

  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
    console.log("in aniC -teamD");

    //set background color  of canvas and the random colors for the boxes
    parentCanvas.style.backgroundColor = "rgba(0, 0, 0, 1)";
    let randomColors = ["#BAE1DD", "#7B1113", "#F88158", "#E7FE40", "#0054B4", "#FF007F"];

    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      let box = document.querySelectorAll(".TEAM_D_ANI_C_Div");
      //add a new box when the right arrow is pressed
      if (e.code === "ArrowRight" && box.length < 49) {
        console.log("show");
        let newColor = document.createElement("span");
        let randomIndex = Math.floor(Math.random() * randomColors.length);

        newColor.style.background = randomColors[randomIndex];
        newColor.classList.add("TEAM_D_ANI_C_Div");
        parentCanvas.appendChild(newColor);
      }
      //delete a box when the left arrow is pressed
      else if (e.code === "ArrowLeft") {
        console.log("not show");
        if (box.length !== 0) {
          box[box.length - 1].remove();
        }
      }
    };


    windowKeyUpRef = function (e) {
      //code for key down in here
      if (e.code === "ArrowRight") {
        console.log("right-arrow down");
        console.log("right-arrow up");
      }
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
  function aniD(parentCanvas) {
    console.log("in ani-D -teamD");
  }

}