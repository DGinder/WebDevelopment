while(true){
    var temp = prompt("Are we there yet?");
    var answer = String(temp);
    answer = answer.toLocaleLowerCase();
    if(answer.includes("yes") || answer.indexOf("yeah") != -1 || answer == "yes" || answer == "yeah"){
        break;
    }
}
alert("Yay, we finally made it!");