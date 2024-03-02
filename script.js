const drawingArea = document.querySelector(".drawingArea");
const buttons = document.querySelector(".buttons");
//isDrawing idea stolen from mdn web docs example
let isDrawing = false;
//mode
let mode = "draw";
//set default value
let gridSize = 16;
//color value 
let colorValue = "#2f27ce";
//creates div
function createDiv(flexBasis) {
    const div = document.createElement("div");
    //add style to the div
    div.setAttribute("class","divPixels");
    //adds style flexBasis so the div spread in a square like manner
    div.style.flexBasis = `${flexBasis}%`;
    //add it to the dom
    drawingArea.appendChild(div);
}
//creates the Grid 
function createGrid(gridSize) {
    //calculates the size for flexBasis in percentage
    let divSize = 100/gridSize;
    //total Div in the grid
    let totalDiv = gridSize * gridSize;
    //creates the grid
    while(totalDiv--) {
        createDiv(divSize);
    }
}
//deletes the div 
function deleteGrid(){
    while (drawingArea.hasChildNodes()) {
        drawingArea.removeChild(drawingArea.firstChild);
    }
}

//generates a random hex color 
function randomColor() {
    let hexValue = "1234567890ABCDEF";
    let color = "#";
    for (let i =  0; i < 6; i++) {
        color += hexValue[Math.floor(Math.random() * 16)];
    }
    return color;
}
//darkens the color
function darkening(valueToDark) {
    let darkeningValue = [];
    valueToDark = valueToDark.slice(valueToDark.indexOf("(") + 1, valueToDark.indexOf(")")).split(",");
    if (valueToDark[0] === "") {
        valueToDark = ["255","255","255"];
    }
    for(let i in valueToDark) {
        darkeningValue[i] = parseInt(valueToDark[i]);
        darkeningValue[i] -= 27;
    }
    // darkeningValue = darkeningValue.toString();
    return (`rgb(${darkeningValue})`);
}

//sets the className to change colors according to the mode var
function colorDiv (event) {
    let target = event.target;
    if (target.className !== "drawingArea") {
        if(mode === "draw"){
            //#050315 is black color i think 
            target.style.backgroundColor = "#050315";
            target.style.borderColor = "#050315"
        }
        else if(mode === "erase") {
            target.style.backgroundColor = "#fbfbfe";
            target.style.borderColor = "#f0f0fc"
        }
        else if(mode === "color") {
            target.style.backgroundColor = colorValue;
            target.style.borderColor = colorValue;
        }
        else if(mode === "rainbow") {
            colorValue = randomColor();
            target.style.backgroundColor = colorValue;
            target.style.borderColor = colorValue;
        }
        else if(mode === "grayScale") {
            target.style.backgroundColor = darkening(target.style.backgroundColor);
            target.style.borderColor = darkening(target.style.borderColor);
        }

    }
}
//checks for colorPicker change and sets colorValue
const colorPicker = document.querySelector("input");
colorPicker.addEventListener("input", (event) => {
    colorValue = event.target.value;
});

//default grid size
createGrid(gridSize);

//check which button is clicked and changes 
buttons.addEventListener("click", event => {
    let target = event.target
    switch(target.id) {
        case "draw":
            mode = "draw";
            break;
        case "erase":
            mode = "erase";
            break;
        case "color":
            mode = "color";
            break;
        case "clear":
            deleteGrid();
            createGrid(gridSize);
            break;
        case "rainbow":
            mode = "rainbow";
            break;
        case "grayScale":
            mode = "grayScale";

            break;
        case "resize":
            gridSize = +prompt("Enter a Grid Size (max 100)");
            if(gridSize <= 100 && gridSize > 0){
                deleteGrid();
                createGrid(gridSize);
            }
            else {
                alert("Enter a correct div number");
            }
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

