const drawingArea = document.querySelector(".drawingArea")

//creates div --is it needed?
function createDiv(flexBasis) {
    const div = document.createElement("div");
    //add style to the div
    div.setAttribute("class","divPixels");

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

