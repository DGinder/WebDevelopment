var age = prompt("How old are you?");
if(age < 18){
    alert("Sorry, you are not old enought to enter te venue");
    window.close();
}
else if (age < 21){
    alert("You can enter but not drink");
}
else{
    alert("welcome to the venue");
}