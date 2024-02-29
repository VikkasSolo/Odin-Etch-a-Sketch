const drawingArea = document.querySelector(".drawingArea");
const buttons = document.querySelector(".buttons");

//TODO --function to get user input, I think :(
//get grid size form user 
let gridSize = 16;
//calculates the size for flexBasis in percentage
let divSize = 100/gridSize;
//total Div in the grid
let totalDiv = gridSize * gridSize;
//isDrawing idea stolen from mdn web docs example
let isDrawing = false;
//mode
let mode = "draw";

//creates div --is it needed?
function createDiv(flexBasis) {
    const div = document.createElement("div");
    //add style to the div
    div.setAttribute("class","divPixels");
    //adds style flexBasis so the div spread in a square like manner
    div.style.flexBasis = `${flexBasis}%`;
    //add it to the dom
    drawingArea.appendChild(div);
}

//sets the className to change colors according to the mode var
function colorDiv (event) {
    let target = event.target;
    if (target.className !== "drawingArea") {
        if(mode === "draw"){
            target.setAttribute("class", "divPixelsBlack");
        }
        else if(mode === "erase") {
            target.setAttribute("class", "divPixels");
        }
    }
}

//creates the grid
while(totalDiv--) {
    createDiv(divSize);
}
//check which button is clicked and changes 
buttons.addEventListener("click", event => {
    switch(event.target.id) {
        case "draw":
            mode = "draw";
            break;
        case "erase":
            mode = "erase";
            break;
        case "resize":
            break;
    }
});
//mouseDown listener calls the colorDiv function  
//isDrawing(var) keeps track of mouseDown movement 
drawingArea.addEventListener("mousedown", event => {
    colorDiv(event);
    isDrawing = true;
} );
// mouseOver listener calls changes the color only if isDrawing(var) is true
//if statement is done to keep track if mouse is pressed down while moving
drawingArea.addEventListener("mouseover", event => {
    if(isDrawing) {
        colorDiv(event);
    }
});
//mouse released no drawing so isDrawing(var) is false
drawingArea.addEventListener("mouseup", () => {
    if(isDrawing) {
        isDrawing = false;
    }
});

