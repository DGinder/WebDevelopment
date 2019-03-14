var p1Score = 0;
var p2Score = 0;
var scoreTotal = 5;
var gameOver = false;

var p1Scr = document.querySelector("#player1Score");
var p2Scr = document.querySelector("#player2Score");
var scr = document.querySelector("p span");
var p1Btn = document.getElementById("player1");
var p2Btn = document.querySelector("#player2");
var rBtn = document.querySelector("#reset");
var input = document.querySelector("input");

p1Scr.textContent = p1Score;
p2Scr.textContent = p2Score;
scr.textContent = scoreTotal;

p1Btn.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        p1Scr.textContent = p1Score;
        if(p1Score === scoreTotal){
            p1Scr.classList.add("winner");
            gameOver = !gameOver;
        }
    }
});
p2Btn.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        p2Scr.textContent = p2Score;
        if(p2Score === scoreTotal){
            p2Scr.classList.add("winner");
            gameOver = !gameOver;
        }
    }
});
rBtn.addEventListener("click", function(){
    p1Score = 0;
    p1Scr.classList.remove("winner")
    p1Scr.textContent = p1Score;
    p2Score = 0;
    p2Scr.classList.remove("winner");
    p2Scr.textContent = p2Score;
    gameOver = false;
});

input.addEventListener("change", function(){
    scoreTotal = parseInt(input.value);
    scr.textContent = scoreTotal;
    if(p1Score >= scoreTotal){
        p1Scr.classList.add("winner");
        gameOver = !gameOver;
    }
    else if(p2Score >= scoreTotal){
        p2Scr.classList.add("winner");
        gameOver = !gameOver;
    }
});

