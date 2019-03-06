var  number = 7;
var string =prompt("Guess my number!");
var temp =  Number(string);
if(temp === number){
    alert("You guessed my number.");
}
else if (temp < number){
    alert("That is to low.")
}
else {
    alert("That is to high.")
}