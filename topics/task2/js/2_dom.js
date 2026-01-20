window.onload = setup

function setup() {
    // console.log(document.getELementById('one'));
    // console.log(document.querySelector("#one"));

    // console.log(document.getElementsByTagName("div"));

    // let allDivs = document.getElementsByTagName("div");
    // concole.log(allDivs.length);

    // console.log(document.querySelector("div"));

    // console.log(document.getElementsByClassName("square_shape"));
    // console.log("running setup");
    console.log(document.querySelectorAll("span")[0].parentElement);
    console.log(document.querySelector(".wrapper_flex_box").children);

    document.querySelector("#two").children[0].innerHTML = "<h3> Hello Js </h3>";

    let childrenOfTwo = document.getElementById("two").children;
    for (let i = 0; i < childrenOfTwo.length; i++) {
        childrenOfTwo[i].textContent = "Hello Js"
    }

    document.querySelector(".square_shape").classList.add("another_class");
    document.querySelector("h1").setAttribute("id", "newId");


    let newDiv = document.createElement("div");
    newDiv.classList.add("square_shape");
    newDiv.innerHTML = " NEW ELEMENT ";
    newDiv.style.backgroundColor = "purple";
    // access parent element
    let parentElement = document.querySelector(".wrapper_flex_box")
    parentElement.appendChild(newDiv)

    let parentElementToRemoveFrom = document.querySelector(".wrapper_flex_box")
    let toRemove = document.getElementById("six");
    parentElementToRemoveFrom.removeChild(toRemove);

}
