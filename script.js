const drawingArea = document.querySelector(".drawingArea")

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

//TODO --function to get user input, I think :(
//get grid size form user 
let gridSize = 16;
//calculate the size for flexBasis in percentage
let divSize = 100/gridSize;
//total Div in the grid
let totalDiv = gridSize * gridSize;

//creates the grid
while(totalDiv--) {
    createDiv(divSize);
}

function colorDivBlack (event) {
    let target = event.target;
    if (target.className !== "drawingArea") {
        target.setAttribute("class", "divPixelsBlack");
    }
}

function colorDivWhite (event) {
    let target = event.target;
    if (target.className !== "drawingArea") {
        target.setAttribute("class", "divPixels");
    }
}

//isDrawing idea stolen from mdn web docs example
let isDrawing = false;

drawingArea.addEventListener("mousedown", event => {
    colorDivBlack(event);
    isDrawing = true;
} );

drawingArea.addEventListener("mouseover", event => {
    if(isDrawing) {
        colorDivBlack(event);
    }
});
drawingArea.addEventListener("mouseup", event => {
    if(isDrawing) {
        isDrawing = false;
    }
});

