//functionality
//variabl declaration
var mode = 6;
var boxes = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var info = document.querySelector(".goal");
var reset = document.querySelector("#reset");
var title = document.querySelector("#Title");
var Btns = document.querySelectorAll(".mode");
var colors = [];
var goalRGB;

//game start
resetGame();


//event listeners
reset.addEventListener("click", function(){
    resetGame();
})

for(i = 0; i < Btns.length; i++){
    Btns[i].addEventListener("click", function(){
        for(i = 0; i < Btns.length; i++){
            Btns[i].classList.remove("selected")
        }
        this.classList.add("selected");
        //number of squares
        this.textContent === "Easy" ? mode = 3 : mode = 6;
        resetGame();
    })
}

for(i = 0; i < boxes.length; i++){
    //add event handlers
    boxes[i].addEventListener("click", function(){
        //get color
        var clickedColor = this.style.backgroundColor;
        //compare color
        if(clickedColor === goalRGB){
            message.textContent = "Correct";
            reset.textContent = 'Play Again?'
            title.style.backgroundColor = clickedColor;
            changeColors(clickedColor);
        }
        else{
            this.style.backgroundColor = "#232323";
            message.textContent = "Try Again";
        }
    })
}




//functions
function randomBackgroundColor(){
    return String("(" + randomeWholeNumber(256) + ", " + randomeWholeNumber(256) + ", " + randomeWholeNumber(256) + ")");
}

function randomeWholeNumber(exclusiveMax){
    return Math.floor(Math.random() * exclusiveMax);
}

function changeColors(color){
    for(i = 0; i < boxes.length; i++){
        boxes[i].style.backgroundColor = color;
    }
}

function fillWithColors(num)
{
    var temp = colors.length
    for(i = 0; i < temp; i++){
        colors.pop();
    }
    for(i = 0; i < num; i++){
        colors.push("rgb" + randomBackgroundColor());
    }
}

function resetGame (){
    //generate all new colors
    fillWithColors(mode);
    //pick a new color at random from array
    goalRGB = colors[randomeWholeNumber(colors.length)];
    info.textContent = goalRGB.toLocaleUpperCase();
    //change colors of squares
    for(i = 0; i < boxes.length; i++){
        if(colors[i]){
            boxes[i].style.backgroundColor = colors[i];
            boxes[i].style.display = "block";
        }
        else{
            boxes[i].style.display = "none";
        }
    }
    //change background
    title.style.backgroundColor = "steelblue";
    //change button text
    reset.textContent = "New Colors"
    message.textContent = "";
}
